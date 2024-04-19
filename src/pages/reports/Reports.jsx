// @ts-nocheck
import React from "react";
import Layout from "../../components/Layout";
import ReportCard from "../../components/ReportCard";
import { MdOutlineSubscriptions } from "react-icons/md";
import { BsCardList, BsCashCoin } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
import { GiSaloon } from "react-icons/gi";
import { FiUsers } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";

export default function Reports() {
  return (
    <Layout
      content={
        <div className="space-y-5">
          <h2 className="text-xl lg:text-2xl font-chivo font-semibold">
            Reports
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-10">
            <ReportCard
              Icon={TbReportAnalytics}
              title="Off Peak Time Report"
              to="/reports/off-peak-time-report"
            />
            <ReportCard
              Icon={TbReportAnalytics}
              title="Client File Report"
              to="/reports/client-file-report"
            />
            <ReportCard
              Icon={MdOutlineSubscriptions}
              title="Subscription Report"
              to="/reports/subscription-report"
            />
            <ReportCard
              Icon={BsCashCoin}
              title="Financial Performance Report"
              to="/reports/financial-performance-report"
            />

            <ReportCard
              Icon={BsCardList}
              title="Appointment Conversion Report"
              to="/reports/appointment-conversion-report"
            />

            <ReportCard
              Icon={BiCategory}
              title="Top Performing Services"
              to="/reports/top-performing-services-report"
            />

            <ReportCard
              Icon={GiSaloon}
              title="Top Performing Salons"
              to="/reports/top-performing-salons-report"
            />

            <ReportCard
              Icon={FiUsers}
              title="Client Status Distribution"
              to="/reports/client-status-distribution-report"
            />
          </div>
        </div>
      }
    />
  );
}
