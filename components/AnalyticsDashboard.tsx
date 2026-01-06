import React from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend, 
  Filler,
  RadialLinearScale,
  ArcElement
} from 'chart.js';
import { Line, Bar, Radar, Doughnut } from 'react-chartjs-2';
import { TrendingUp, Clock, Brain, Target, Award, ArrowUpRight, BookOpen } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const AnalyticsDashboard: React.FC = () => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true, grid: { display: false } },
      x: { grid: { display: false } }
    }
  };

  const progressData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Focus Minutes',
      data: [45, 52, 38, 65, 48, 72, 60],
      borderColor: '#6d5dfc',
      backgroundColor: 'rgba(109, 93, 252, 0.1)',
      fill: true,
      tension: 0.4,
    }]
  };

  const subjectData = {
    labels: ['Science', 'Math', 'English', 'History', 'Social'],
    datasets: [{
      label: 'Mastery Level',
      data: [85, 72, 90, 68, 75],
      backgroundColor: 'rgba(109, 93, 252, 0.6)',
      borderRadius: 8,
    }]
  };

  const radarData = {
    labels: ['Memory', 'Logic', 'Focus', 'Creativity', 'Speed', 'Accuracy'],
    datasets: [{
      label: 'Cognitive Profile',
      data: [90, 75, 82, 95, 70, 88],
      backgroundColor: 'rgba(109, 93, 252, 0.2)',
      borderColor: '#6d5dfc',
      pointBackgroundColor: '#6d5dfc',
    }]
  };

  return (
    <div className="p-6 md:p-8 space-y-8 pb-24 md:pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Learning Analytics</h1>
          <p className="text-gray-500">Track your progress and cognitive development</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white rounded-xl shadow-clay text-sm font-bold text-gray-600">Weekly</button>
          <button className="px-4 py-2 bg-primary text-white rounded-xl shadow-clay text-sm font-bold">Monthly</button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard icon={<Clock />} label="Study Time" value="12.4 hrs" trend="+15%" />
        <MetricCard icon={<Brain />} label="Focus Score" value="88/100" trend="+2.4" />
        <MetricCard icon={<Target />} label="Lessons Done" value="18" trend="+3" />
        <MetricCard icon={<Award />} label="Mastery" value="Level 4" trend="Top 10%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Learning Trend */}
        <div className="bg-[#e0e5ec] p-6 rounded-[32px] shadow-clay h-[400px] flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-primary" />
            Learning Activity Trend
          </h3>
          <div className="flex-1">
            <Line data={progressData} options={chartOptions} />
          </div>
        </div>

        {/* Subject Performance */}
        <div className="bg-[#e0e5ec] p-6 rounded-[32px] shadow-clay h-[400px] flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <BookOpen size={20} className="text-blue-500" />
            Subject Mastery
          </h3>
          <div className="flex-1">
            <Bar data={subjectData} options={chartOptions} />
          </div>
        </div>

        {/* Cognitive Profile */}
        <div className="bg-[#e0e5ec] p-6 rounded-[32px] shadow-clay h-[400px] flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Brain size={20} className="text-purple-500" />
            Cognitive Strength Profile
          </h3>
          <div className="flex-1">
            <Radar 
              data={radarData} 
              options={{
                ...chartOptions,
                scales: { 
                  r: { 
                    beginAtZero: true, 
                    grid: { color: '#d1d9e6' },
                    angleLines: { color: '#d1d9e6' },
                    ticks: { display: false }
                  } 
                }
              }} 
            />
          </div>
        </div>

        {/* Completion Status */}
        <div className="bg-[#e0e5ec] p-6 rounded-[32px] shadow-clay h-[400px] flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Target size={20} className="text-green-500" />
            Curriculum Completion
          </h3>
          <div className="flex-1 flex items-center justify-center relative">
            <div className="w-64 h-64">
              <Doughnut 
                data={{
                  labels: ['Completed', 'In Progress', 'Remaining'],
                  datasets: [{
                    data: [65, 20, 15],
                    backgroundColor: ['#6d5dfc', '#4299e1', '#d1d9e6'],
                    borderWidth: 0,
                  }]
                }}
                options={{ 
                  cutout: '75%', 
                  plugins: { 
                    legend: { display: true, position: 'bottom' } 
                  } 
                }}
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-gray-800">65%</span>
              <span className="text-xs text-gray-500 font-bold uppercase">Total Done</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ icon, label, value, trend }: any) => (
  <div className="bg-[#e0e5ec] p-6 rounded-[32px] shadow-clay flex items-center gap-4">
    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-clay-sm">
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div className="flex-1">
      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</div>
      <div className="flex items-end justify-between">
        <div className="text-xl font-bold text-gray-800">{value}</div>
        <div className="flex items-center text-green-500 text-xs font-bold">
          <ArrowUpRight size={14} />
          {trend}
        </div>
      </div>
    </div>
  </div>
);

export default AnalyticsDashboard;