"use client";

/** External */
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { get, set } from "idb-keyval";
import axios from "axios";

/** Internal */
import FullScreenLoader from "@/app/components/FullScreenLoader/FullScreenLoader";
import classes from "./DashboardHeader.module.css";

const DashboardHeader = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/");
    return;
  }

  const handleAddCourseClick = async () => {
    try {
      const dirHandle = await window.showDirectoryPicker();
      setIsLoading(true);
      await processFolderAndSave(dirHandle);
    } catch (err) {
      console.log("Error adding course:", err);
    }
    setIsLoading(false);
  };

  const getSectionNames = async (dirHandle) => {
    const sectionNames = [];
    for await (const [name, entry] of dirHandle) {
      if (entry.kind === "directory") {
        sectionNames.push(name);
      }
    }
    return sectionNames;
  };

  const getVideoDuration = async (file) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.style.display = "none";
      video.preload = "metadata";

      video.onloadedmetadata = () => {
        resolve(video.duration);
        video.remove();
      };

      video.onerror = (err) => {
        reject(err);
        video.remove();
      };

      video.src = URL.createObjectURL(file);
    });
  };

  const getFilesData = async (dirHandle) => {
    const files = [];

    for await (const [name, entry] of dirHandle) {
      if (entry.kind === "file") {
        const file = await entry.getFile();

        let duration = 0;
        if (file.type.includes("video")) {
          duration = await getVideoDuration(file);
        }

        const fileObject = {
          name,
          lastModified: file.lastModified,
          size: file.size,
          type: file.type,
          duration,
        };

        files.push(fileObject);
      }
    }

    return files;
  };

  const getTotalSize = (sectionOrFileObj) => {
    const totalDuration = sectionOrFileObj.reduce((acc, file) => {
      return acc + file.size;
    }, 0);

    return totalDuration;
  };

  const getTotalDuration = (sectionOrFileObj) => {
    const totalDuration = sectionOrFileObj.reduce((acc, file) => {
      return acc + file.duration;
    }, 0);

    return totalDuration;
  };

  const getSectionData = async (sectionNames, dirHandle) => {
    const sectionData = [];

    for (const sectionName of sectionNames) {
      const sectionHandle = await dirHandle.getDirectoryHandle(sectionName);
      const files = await getFilesData(sectionHandle);
      const size = getTotalSize(files);
      const duration = getTotalDuration(files);

      sectionData.push({ name: sectionName, files, size, duration });
    }

    // sort sectionData by name
    sectionData.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    });

    return sectionData;
  };

  const getCourseData = async (sectionData, dirHandle) => {
    return {
      name: dirHandle.name,
      sections: sectionData,
      uploadedAt: Date.now(),
      duration: getTotalDuration(sectionData),
      size: getTotalSize(sectionData),
    };
  };

  const processFolderAndSave = async (dirHandle) => {
    const sectionNames = await getSectionNames(dirHandle);
    const sectionData = await getSectionData(sectionNames, dirHandle);
    const courseData = await getCourseData(sectionData, dirHandle);

    // Save courseData to the server
    try {
      await axios.post("/api/courses", {
        course: courseData,
      });
    } catch (err) {
      console.error("Error saving course data:", err);
    }
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.title}>Courses</div>
        <div className={classes.addCourseBtn} onClick={handleAddCourseClick}>
          Add course
        </div>
      </div>
      {isLoading && <FullScreenLoader />}
    </>
  );
};

export default DashboardHeader;
