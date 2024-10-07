import React, { useState, useMemo } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Section from "../Section/Section";
import styles from "./FilterTabs.module.css";
import { allSongsTabs } from "../../config/helper-config";

// Move TabPanel outside the component
function TabPanel({ children, value, index }) {
  return <div>{value === index && <>{children}</>}</div>;
}

const FilterTabs = ({ data, loadingState }) => {
  const [value, setValue] = useState(0);

  const _handleTabs = (e, val) => {
    setValue(val);
  };

  // Memoize filteredData function
  const filteredData = useMemo(() => {
    if (value === 0) {
      return data; // Show all data for the "All" tab.
    } else {
      const tabLabel = ["Rock", "Pop", "Jazz", "Blues"][value - 1];
      return data?.filter(
        (item) => item?.genre?.key === tabLabel?.toLowerCase()
      );
    }
  }, [value, data]);

  return (
    <div className={styles.filterSectionWrapper}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={_handleTabs}
            aria-label="basic tabs"
            id={styles.tabs_wrapper}
          >
            {allSongsTabs.map((each, index) => (
              <Tab label={each} key={index} sx={{ color: "white" }} />
            ))}
          </Tabs>
        </Box>

        {allSongsTabs.map((item, index) => (
          <TabPanel key={index} value={value} index={index}>
            <div>
              <Section
                data={filteredData}
                type="songs"
                header={"filterAll"}
                loadingState={loadingState}
              />
            </div>
          </TabPanel>
        ))}
      </Box>
    </div>
  );
};

export default FilterTabs;
