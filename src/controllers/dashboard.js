import { getDashboardData } from '../services/dashboard.js';

export const getDashboardController = async (req, res) => {
  const dashboardData = await getDashboardData();

  res.json({
    status: 200,
    message: 'Successfully retrieved dashboard data!',
    data: dashboardData,
  });
};
