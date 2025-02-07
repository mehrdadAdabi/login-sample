import { Box, Skeleton } from "@mui/material";
import { Props } from "./types/skeleton.type";

function SkeletonComponent(props: Props) {
  return (
    <>
      {props.isShow && (
        <Box
          sx={{
            width: 380,
            height: 300,
            backgroundColor: "rgb(241 241 241 / 70%)",
            borderRadius: "10px",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            margin:"0 auto"
          }}
        >
          <Skeleton
            variant="rectangular"
            width="100%"
            height="70%"
            animation="wave"
            className="rounded-md"
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              marginTop: 1,
              gap: "10px",
              borderRadius: "10px",
            }}
          >
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              animation="wave"
            />
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              animation="wave"
            />
          </Box>
        </Box>
      )}
    </>
  );
}

export default SkeletonComponent;
