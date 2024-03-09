"use client";

/** External */
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

/** Internal */
import classes from "./DashboardHeader.module.css";

const DashboardHeader = () => {
  const [folderContents, setFolderContents] = useState([]);

  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/");
    return;
  }

  const handleFolderSelection = async () => {
    try {
      const dirHandle = await window.showDirectoryPicker();
      // const directoryInfo = {
      //   name: dirHandle.name,
      //   kind: dirHandle.kind,
      //   // Add any other relevant properties you need from the baseDirectoryHandle
      // };
      // const dirHandlerInfo = localStorage.getItem("dirHandle");
      // const dirHandle = JSON.parse(dirHandlerInfo);
      // console.log({ dirHandle, str: JSON.stringify(directoryInfo) });
      // localStorage.setItem("dirHandle", JSON.stringify(directoryInfo));
      const { sections, fileHandlers } = await parseFolderContents(dirHandle);
      console.log({ sections, fileHandlers, name: dirHandle.name, dirHandle });
    } catch (err) {
      console.error("Error selecting folder:", err);
    }
  };

  const parseFolderContents = async (directoryHandle) => {
    const sections = [];
    const fileHandlers = [];

    for await (const [name, entry] of directoryHandle) {
      if (entry.kind === "directory") {
        const fileHandlers = await parseFileHandlersInTheDirectory(entry);
        sections.push(fileHandlers);
      } else if (entry.kind === "file") {
        fileHandlers.push(entry);
      }
    }

    return { sections, fileHandlers };
  };

  const parseFileHandlersInTheDirectory = async (directoryHandle) => {
    const files = [];
    for await (const [name, entry] of directoryHandle) {
      if (entry.kind === "file") {
        files.push(entry);
      }
    }
    return files;
  };

  // const handleFolderSelection = async () => {
  //   try {
  //     const directoryHandle = await window.showDirectoryPicker();
  //     const dirHandle = await window.showDirectoryPicker();

  //     // for await (const [key, value] of dirHandle.entries()) {
  //     //   console.log({ key, value, files: await value.getFile() });
  //     // }

  //     const folderData = await parseFolderContents(directoryHandle);
  //     setFolderContents(folderData);
  //   } catch (error) {
  //     console.error("Error selecting folder:", error);
  //   }
  // };

  // const parseFolderContents = async (directoryHandle) => {
  //   const folderData = [];
  //   for await (const [name, entry] of directoryHandle) {
  //     console.log({ name, entry });
  //     if (entry.kind === "directory") {
  //       folderData.push(entry);
  //     } else {
  //       const file = await entry.getFile();
  //       // const fileContent = await file.text();
  //       folderData.push(entry);
  //     }
  //   }
  //   return folderData;
  // };

  // const handleItemClick = (itemName) => {
  //   // You can implement logic here to handle the click event
  //   console.log("Clicked item:", itemName);
  //   // For simplicity, let's just log the clicked item for now
  // };

  return (
    <div className={classes.dashboardHeader}>
      <button onClick={handleFolderSelection}>Add</button>
      <div className={classes.folderContents}>
        {folderContents.map((item, index) => (
          <div key={index} onClick={() => handleItemClick(item)}>
            {typeof item === "string" ? (
              item
            ) : (
              <div>
                <strong>{item.name}</strong>
                <pre>{item.content}</pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHeader;
