import React, { useState, useMemo } from 'react';
import Pagination from './../Pagination/Pagination';

let PageSize = 10;

export default function TestApp() {
    const poemArray = [
        "Все!",
        "Тает твердь, в наклон идёт планета,",
        "Законам космоса, как прежде подчинясь,",
        "Кипят снега в ручьях, играют светом",
        "В калюжах отражением смеясь.",
        "Апрель горяч, обнявшись с солнцем ходит,",
        "Нательный лёд срывая от земли,",
        "Весну, ещё раздетой в свет выводит,",
        "Наслуд ломая, отпускает корабли.",
        "Март стужу не прогнал, слабо начало!",
        "Зима при нём гуляла в дыгыле!",
        "Морозом ночью северным дышала,",
        "Была студёна, будто в феврале.",
        "А нынче гам стоит, тревожит душу,",
        "Воробушки гладят, осыпали ивняк,",
        "Перебирает важно лапками крякуша,",
        "Заманивая селезня в овраг.",
        "Все ожило, иль заново родиться",
        "Веками повториться вновь и вновь,",
        "Зима в Весну, из снега превратиться,",
        "Даря надежду, веру, и любовь."
    ];
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return poemArray.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    return (
        <>
            {currentTableData.map((item, index) => {
                return (
                    <div key={index}>
                        <p>{item}</p>
                    </div>
                );
            })}
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={poemArray.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </>
    );
}