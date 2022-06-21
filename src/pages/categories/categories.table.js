import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/data.table.css";
const $ = require("jquery");
const DataTable = require("datatables.net");

$.DataTable = DataTable;

const CategoriesTable = ({ data }) => {
  const navigate = useNavigate();
  const tableRef = useRef();

  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      data: data.map((category) => [category._id, category.name]),
      columns: [
        {
          title: "ID",
        },
        {
          title: "Name",
        },

        {
          title: "Action",
          createdCell: function (td, cellData, rowData) {
            td.addEventListener("click", function (e) {
              navigate(`/categories/${rowData[0]}`);
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
  }, [data, navigate]);

  return (
    <div>
      <table className="display" width={"100%"} ref={tableRef}></table>
    </div>
  );
};

export default CategoriesTable;
