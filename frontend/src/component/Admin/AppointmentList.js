import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./doctorList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import {
  deleteAppointment,
  getAllAppointments,
  clearErrors,
} from "../../actions/appointmentAction";
import { DELETE_APPOINTMENT_RESET } from "../../constants/appointmentConstants";

const AppointmentList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, appointments } = useSelector((state) => state.allAppointments);

  const { error: deleteError, isDeleted } = useSelector((state) => state.appointment);

  const deleteAppointmentHandler = (id) => {
    dispatch(deleteAppointment(id));
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
      alert.success("Appointment Deleted Successfully");
      history.push("/admin/appointments");
      dispatch({ type: DELETE_APPOINTMENT_RESET });
    }

    dispatch(getAllAppointments());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Appointment ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
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
            <Link to={`/admin/appointment/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteAppointmentHandler(params.getValue(params.id, "id"))
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

  appointments &&
    appointments.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.appointmentItems.length,
        amount: item.totalFee,
        status: item.appointmentStatus,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL APPOINTMENTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="doctorListContainer">
          <h1 id="doctorListHeading">ALL APPOINTMENTS</h1>

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

export default AppointmentList;
