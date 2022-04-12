import { useState } from 'react';
import DashboardList from './DashboardList';
import DashboardListHeader from './DashboardListHeader';

const DashboardListContainer = (props) => {
  const { reports, showTable } = props;
  const [expandReport, setExpandReport] = useState(true);
  const reportOpenHandler = (expandReport) => {
    setExpandReport(expandReport);
  };

  return (
    <>
      <DashboardListHeader {...{ reportOpenHandler }} showTable={showTable} />
      <DashboardList {...{ expandReport, reports }} />
    </>
  );
};
export default DashboardListContainer;
