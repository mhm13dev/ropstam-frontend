import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/data.table.css";
const $ = require("jquery");
const DataTable = require("datatables.net");

$.DataTable = DataTable;

const CarsTable = ({ data, categories }) => {
  const navigate = useNavigate();
  const tableRef = useRef();

  useEffect(() => {
    if (categories.length === 0) return;
    const table = $(tableRef.current).DataTable({
      data: data.map((car) => [
        car.model,
        car.make,
        car.reg_num,
        car.color,
        categories.find((c) => c._id === car.category_id).name,
      ]),
      columns: [
        {
          title: "Model",
        },
        {
          title: "Make",
        },
        {
          title: "Registration No",
        },
        {
          title: "Color",
        },
        {
          title: "Category",
        },
        {
          title: "Action",
          createdCell: function (td, cellData, rowData) {
            td.addEventListener("click", function (e) {
              navigate(`/cars/${rowData[0]}`);
            });
          },
          data: null,
          className: "",
          defaultContent: `<button class="border px-3 py-1 block hover:bg-gray-200 rounded">View</button>`,
          orderable: false,
        },
      ],
      destroy: true,
    });

    return () => {
      table.destroy();
    };
  }, [data, navigate, categories]);

  return (
    <div>
      <table className="display" width={"100%"} ref={tableRef}></table>
    </div>
  );
};

export default CarsTable;
