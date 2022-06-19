import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./doctorList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminDoctor,
  deleteDoctor,
} from "../../actions/doctorAction.js";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_DOCTOR_RESET } from "../../constants/doctorConstants";

const DoctorList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, doctors } = useSelector((state) => state.doctors);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.doctor
  );

  const deleteDoctorHandler = (id) => {
    dispatch(deleteDoctor(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Doctor Deleted Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: DELETE_DOCTOR_RESET });
    }

    dispatch(getAdminDoctor());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Doctor ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "fee",
      headerName: "Fee",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/doctor/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteDoctorHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  doctors &&
    doctors.forEach((item) => {
      rows.push({
        id: item._id,
        age: item.Age,
        fee: item.fee,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL DOCTORS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="doctorListContainer">
          <h1 id="doctorListHeading">ALL DOCTORS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="doctorListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default DoctorList;
