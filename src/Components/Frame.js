import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const Frame = () => {
  return (
    <>
      <Stack spacing={1}>
        <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
        <Skeleton variant="rounded" width={400} height={60} />
        <Skeleton variant="rounded" width={400} height={60} />
        <Skeleton variant="rounded" width={400} height={60} />
        <Skeleton variant="rounded" width={400} height={60} />
      </Stack>
      <Stack>
        <Skeleton variant="rounded" width={300} height={60} />
      </Stack>
    </>
  );
};

export default Frame;
