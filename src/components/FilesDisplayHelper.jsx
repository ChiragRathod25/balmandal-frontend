import React, { useEffect } from 'react';
import { Modal } from './index';
import log from '../utils/logger.js';

function FilesDisplayHelper({ cloudFiles }) {
  useEffect(() => {
    log.debug('Rerendering for cloudFiles file manager', cloudFiles);
  }, [cloudFiles]);

  const [isMenuVisible, setIsMenuVisible] = React.useState(null);
  useEffect(() => {
    log.debug('isMenuVisible', isMenuVisible);
  }, [isMenuVisible]);

  const handleDownload = (index) => {
    async function downloadFileFromServer(fileUrl, fileName) {

      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    }
    const extension = cloudFiles[index].split('.').pop();
    const fileurl = cloudFiles[index].replace('http://', 'https://');
    downloadFileFromServer(fileurl, `file-${index}.${extension}`);
  };

  // set Modal Functionality
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState(null);
  const [modalTitle, setModalTitle] = React.useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleView = (file) => {
    if (!file) return;
    setModalTitle('File Preview');
    setModalContent(
      <div className="flex flex-col items-center justify-center">
        {file.includes('image') ? (
          <img src={file} alt="File Preview" className="w-full h-auto" />
        ) : (
          <video src={file} controls className="w-full h-auto" />
        )}
      </div>
    );
    openModal();
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        className="w-full max-w-3xl h-full overflow-y-auto"
      >
        <div className="flex flex-col items-center justify-center">{modalContent}</div>
      </Modal>

      {/* File Manager Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:p-4 p-1">
        {cloudFiles?.length > 0 &&
          cloudFiles.map((file, index) => (
            <div
              key={index}
              className="relative border border-gray-200 rounded-lg shadow-md bg-white transition hover:shadow-lg"
            >
              {/* File Preview */}
              {/* <div className="relative"> */}
              <div className="relative border border-gray-200 rounded-lg shadow-md bg-white transition hover:shadow-lg overflow-hidden p-1">
                {file.includes('image') ? (
                  <img
                    src={file}
                    className="w-full h-40 object-cover rounded-t-lg transition-transform hover:scale-105"
                    onError={(e) => (e.target.src = '/fallback-image.jpg')}
                  />
                ) : (
                  <video
                    src={file}
                    controls
                    className="w-full h-40 rounded-t-lg transition-transform hover:scale-105"
                  />
                )}

                {/* Options Button */}
                <button
                  className="absolute top-2 right-2 bg-gray-100 text-gray-600 p-2 rounded-full hover:bg-gray-300 transition"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuVisible(isMenuVisible === index ? null : index);
                  }}
                  onMouseOver={() => setIsMenuVisible(index)}
                  onMouseEnter={() => setIsMenuVisible(index)}
                >
                  ⋮
                </button>
              </div>

              {/* Dropdown Menu */}
              {isMenuVisible === index && (
                <div
                  className="absolute top-10 right-4 bg-white border border-gray-300 shadow-lg rounded-md p-2 w-32 z-10"
                  onMouseLeave={() => setIsMenuVisible(null)}
                >
                  <ul className="text-sm text-gray-700">
                    <li
                      className="hover:bg-gray-100 p-2 cursor-pointer"
                      onClick={() => {
                        setIsMenuVisible(null);
                        handleDownload(index);
                      }}
                    >
                      Download
                    </li>
                    <li
                      className="hover:bg-gray-100 p-2 cursor-pointer"
                      onClick={() => {
                        setIsMenuVisible(null);
                        handleView(file);
                      }}
                    >
                      View
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
}

export default FilesDisplayHelper;
