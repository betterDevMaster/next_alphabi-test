import React, { useCallback, useEffect, useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import { BeatLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "./Pagination";

const PageSize = 50;

const Gallery = ({ searchValue }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [images, setImages] = useState({
    source: [],
    isLoading: false,
    total: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (searchValue) fetchApi(searchValue);
  }, [searchValue, currentPage]);

  const fetchApi = async (val) => {
    const key = process.env.NEXT_PUBLIC_API_KEY;
    const offset = PageSize * currentPage;
    setImages({ ...images, isLoading: true });

    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?q=${val}&api_key=${key}&offset=${offset}&limit=${PageSize}`
      );
      const ret = await response.json();

      if (ret.data && ret.data.length > 0) {
        const newArr = ret.data.map((r) => r.images.preview_gif.url);
        setImages({
          source: newArr,
          isLoading: false,
          total: ret.pagination.total_count,
        });
      } else {
        setImages({ ...images, source: [], isLoading: false });
      }
    } catch (error) {
      console.log(error);
      toast.error("fetchApi Error: " + error.message);
      setImages({ source: [], isLoading: false, total: 0 });
    }
  };

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <div className="text-center mt-4 w-100">
      {images.isLoading && (
        <div className="w-25 text-center my-4">
          <BeatLoader color="blue" size={12} />
        </div>
      )}
      {images.source.length === 0 && (
        <div className="fs-4 text-center my-4">No images.</div>
      )}
      {images.source.map((src, index) => (
        <img
          src={src}
          className="cursor-pointer border border-gray-300 rounded-2"
          onClick={() => openImageViewer(index)}
          width="175"
          height="90"
          key={index}
          alt=""
        />
      ))}
      {isViewerOpen && (
        <ImageViewer
          src={images.source}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)",
            zIndex: 10000,
          }}
          closeOnClickOutside={true}
        />
      )}
      <Pagination
        customClass="mt-4"
        currentPage={currentPage}
        totalCount={images.total}
        pageSize={PageSize}
        onPageChange={setCurrentPage}
      />
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

export default Gallery;
