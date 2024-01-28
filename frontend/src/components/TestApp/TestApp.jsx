import React, { useState } from 'react';
import Pagination from './../Pagination/Pagination';

let PageSize = 2;

export default function TestApp() {
    const arrayOfArrays = [
        ['https://res.cloudinary.com/dfy41pnoa/image/upload/v1703315230/image_7_b0f0f8f818.jpg', 'https://res.cloudinary.com/dfy41pnoa/image/upload/v1703315230/image_7_b0f0f8f818.jpg', 'https://res.cloudinary.com/dfy41pnoa/image/upload/v1703315230/image_7_b0f0f8f818.jpg', 'https://res.cloudinary.com/dfy41pnoa/image/upload/…SEFELINE_FITZ_AND_FLOYD_USA_1990_1_85defa3bf5.jpg', 'https://res.cloudinary.com/dfy41pnoa/image/upload/v1703007252/1_3_e825edfbbe.png', 'https://res.cloudinary.com/dfy41pnoa/image/upload/v1705506587/015_by_OCEAN_GALE_1_130b05ec53.jpg', 'https://res.cloudinary.com/dfy41pnoa/video/upload/v1705676429/bandicam_2024_01_19_21_00_02_508_0e4f128128.mp4', 'https://res.cloudinary.com/dfy41pnoa/video/upload/v1705691576/Katya_Lel_Moj_marmeladnyj_8d91226a0d.mp4'],
        ['https://res.cloudinary.com/dfy41pnoa/image/upload/v1703007252/1_3_e825edfbbe.png', 'https://res.cloudinary.com/dfy41pnoa/image/upload/v1705506587/015_by_OCEAN_GALE_1_130b05ec53.jpg', 'https://res.cloudinary.com/dfy41pnoa/image/upload/v1705506587/015_by_OCEAN_GALE_1_130b05ec53.jpg']
    ];
    // Initialize currentPage state with default values for each poem array index
    const initialCurrentPage = Object.fromEntries(arrayOfArrays.map((_, index) => [index, 1]));
    const [currentPage, setCurrentPage] = useState(initialCurrentPage);

    const handlePageChange = (page, index) => {
        setCurrentPage((prevPages) => ({
            ...prevPages,
            [index]: page,
        }));
    };

    return (
        <>
            {arrayOfArrays.map((itemPoem, indexPoem) => {
                const currentTableData = () => {
                    const firstPageIndex = (currentPage[indexPoem] - 1) * PageSize;
                    const lastPageIndex = firstPageIndex + PageSize;
                    return itemPoem.slice(firstPageIndex, lastPageIndex);
                };

                return (
                    <div key={indexPoem}>
                        {currentTableData().map((item, index) => (
                            <div key={index} style={{ width: '500px', height: '500px' }}>
                                {item.includes('.mp4') ? (
                                    <video src={item} controls></video>
                                ) : (
                                    <img src={item} alt="" />
                                )}
                            </div>
                        ))}
                        <Pagination
                            className="pagination-bar"
                            currentPage={currentPage[indexPoem]}
                            totalCount={itemPoem.length}
                            pageSize={PageSize}
                            onPageChange={(page) => handlePageChange(page, indexPoem)}
                        />
                    </div>
                );
            })}
        </>
    );
}