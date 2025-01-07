import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";

interface EditFareFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (fareData: any) => void;
  initialData: any;
}

const EditFareForm: React.FC<EditFareFormProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [fareData, setFareData] = useState(initialData || {});
  const [routes, setRoutes] = useState<string[]>([]);

  useEffect(() => {
    setFareData(initialData); // Ensure form data is updated when `initialData` changes
  }, [initialData]);

  // Fetch routes from the backend
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get("/api/routes"); // Ensure this endpoint returns the registered routes
        const routeAbbreviations = response.data.map(
          (route: any) => route.abbreviation
        );
        setRoutes(routeAbbreviations);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRoutes();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFareData({ ...fareData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = () => {
    const requiredFields = ["route", "accommodation", "fullMin", "fullPerKM"];
    for (let field of requiredFields) {
      if (!fareData[field]) {
        alert(`Field ${field} is required.`);
        return;
      }
    }
    onSubmit(fareData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Fare Details</DialogTitle>
      <DialogContent>
        {/* Bus Route Dropdown */}
        <FormControl fullWidth style={{ marginBottom: "16px" }}>
          <InputLabel>Bus Route</InputLabel>
          <Select
            name="route"
            value={fareData.route || ""}
            onChange={handleChange}
          >
            {routes.map((route, index) => (
              <MenuItem key={index} value={route}>
                {route}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Accommodation Dropdown */}
        <FormControl fullWidth style={{ marginBottom: "16px" }}>
          <InputLabel>Accommodation</InputLabel>
          <Select
            name="accommodation"
            value={fareData.accommodation || ""}
            onChange={handleChange}
          >
            <MenuItem value="Aircon">Aircon</MenuItem>
            <MenuItem value="Non-aircon">Non-aircon</MenuItem>
          </Select>
        </FormControl>

        {/* Fare Input Fields */}
        <TextField
          name="fullMin"
          label="FULL Minimum"
          type="number"
          fullWidth
          value={fareData.fullMin || ""}
          onChange={handleChange}
          style={{ marginBottom: "16px" }}
        />
        <TextField
          name="fullPerKM"
          label="FULL per KM"
          type="number"
          fullWidth
          value={fareData.fullPerKM || ""}
          onChange={handleChange}
          style={{ marginBottom: "16px" }}
        />
        <TextField
          name="spMin"
          label="SP/SR Minimum"
          type="number"
          fullWidth
          value={fareData.spMin || ""}
          onChange={handleChange}
          style={{ marginBottom: "16px" }}
        />
        <TextField
          name="spPerKM"
          label="SP/SR per KM"
          type="number"
          fullWidth
          value={fareData.spPerKM || ""}
          onChange={handleChange}
          style={{ marginBottom: "16px" }}
        />
        <TextField
          name="promoPerKM"
          label="PROMO per KM"
          type="number"
          fullWidth
          value={fareData.promoPerKM || ""}
          onChange={handleChange}
          style={{ marginBottom: "16px" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditFareForm;
