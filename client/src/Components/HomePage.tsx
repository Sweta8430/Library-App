import { Carasoul } from "./Carasoul";
import { ExploreTopBooks } from "./ExploreTopBooks";
import { ImagePage } from "./ImagePage";
import { LibraryServices } from "./LibraryServices";

export const HomePage = () => {
  return (
    <>
      <ExploreTopBooks />
      <Carasoul />
      <ImagePage />
      <LibraryServices />
    </>
  );
};
