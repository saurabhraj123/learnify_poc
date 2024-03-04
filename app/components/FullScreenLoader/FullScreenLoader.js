/** External */
import { RotatingLines } from "react-loader-spinner";

/** Internal */
import classes from "./FullScreenLoader.module.css";

const FullScreenLoader = () => {
  return (
    <div className={classes.container}>
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default FullScreenLoader;
