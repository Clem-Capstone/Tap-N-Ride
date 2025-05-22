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
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";

interface FareFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (fareData: any) => void;
}

const FareMatrixForm: React.FC<FareFormProps> = ({ open, onClose, onSubmit }) => {
  const [fareData, setFareData] = useState({
    route: "",
    accommodation: "",
    fullMin: "",
    fullPerKM: "",
    spMin: "",
    spPerKM: "",
    promoPerKM: "",
  });
  const [selection, setSelection] = useState<string>("selectAll");
  const [routes, setRoutes] = useState<string[]>([]); // State to hold route abbreviations

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

  // Clear form state when the dialog opens
  useEffect(() => {
    if (open) {
      setFareData({
        route: "",
        accommodation: "",
        fullMin: "",
        fullPerKM: "",
        spMin: "",
        spPerKM: "",
        promoPerKM: "",
      });
      setSelection("selectAll");
    }
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFareData({ ...fareData, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelection(e.target.value);
  };

  const handleFormSubmit = () => {
    const requiredFields = ["route", "accommodation", "fullMin", "fullPerKM"];
    for (let field of requiredFields) {
      if (!fareData[field]) {
        alert(`Field ${field} is required.`);
        return;
      }
    }

    onSubmit({ ...fareData, selection });
    onClose(); // Close the dialog after submission
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add Fare Matrix</DialogTitle>
      <DialogContent>
        {/* Bus Route Dropdown */}
        <FormControl fullWidth style={{ marginBottom: "16px" }}>
          <InputLabel>Bus Route</InputLabel>
          <Select
            name="route"
            value={fareData.route}
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
            value={fareData.accommodation}
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
          value={fareData.fullMin}
          onChange={handleChange}
          style={{ marginBottom: "16px" }}
        />
        <TextField
          name="fullPerKM"
          label="FULL per KM"
          type="number"
          fullWidth
          value={fareData.fullPerKM}
          onChange={handleChange}
          style={{ marginBottom: "16px" }}
        />
        <TextField
          name="spMin"
          label="SP/SR Minimum"
          type="number"
          fullWidth
          value={fareData.spMin}
          onChange={handleChange}
          style={{ marginBottom: "16px" }}
        />
        <TextField
          name="spPerKM"
          label="SP/SR per KM"
          type="number"
          fullWidth
          value={fareData.spPerKM}
          onChange={handleChange}
          style={{ marginBottom: "16px" }}
        />
        <TextField
          name="promoPerKM"
          label="PROMO per KM"
          type="number"
          fullWidth
          value={fareData.promoPerKM}
          onChange={handleChange}
          style={{ marginBottom: "16px" }}
        />

        {/* Radio Buttons for Selection */}
        <FormControl>
          <RadioGroup value={selection} onChange={handleRadioChange}>
            <FormControlLabel
              value="selectAll"
              control={<Radio />}
              label="Select All"
            />
            <FormControlLabel
              value="selectedPlace"
              control={<Radio />}
              label="Selected Place Only"
            />
          </RadioGroup>
        </FormControl>
      </DialogContent>

      {/* Dialog Actions */}
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FareMatrixForm;
