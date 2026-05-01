'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks');
        setTasks(response.data.data);
        setLoading(false);
      } catch (err) {
        router.push('/login');
      }
    };
    fetchTasks();
  }, [router]);

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      router.push('/login');
    } catch (err) {
      console.error("Logout failed", err);
      router.push('/login');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#131314]">
        <div className="text-xl font-medium animate-pulse text-[#c4c7c5]">
          Checking authorization...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#131314] text-[#e3e3e3] p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-10 border-b border-[#37393b] pb-6">
          <div>
            <h1 className="text-3xl font-semibold text-white">Task Dashboard</h1>
            <p className="text-[#8e918f] text-sm mt-1">Manage your assignments and progress</p>
          </div>
          <button 
            onClick={handleLogout}
            className="rounded-xl border border-[#37393b] bg-[#1e1f20] px-5 py-2.5 text-sm font-medium text-[#f2b8b5] hover:bg-[#3c4043] transition-colors shadow-lg"
          >
            Logout
          </button>
        </div>

        {/* Task List Section */}
        <div className="grid gap-6">
          {tasks.length > 0 ? (
            tasks.map((task: any) => (
              <div 
                key={task._id} 
                className="rounded-2xl border border-[#37393b] bg-[#1e1f20] p-6 shadow-xl transition-all hover:border-[#a8c7fa]/50 hover:bg-[#28292a]"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium text-white">{task.title}</h3>
                  <span className={`rounded-lg px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                    task.status === 'completed' 
                      ? 'bg-[#0f5223] text-[#c4eed0]' 
                      : 'bg-[#443105] text-[#ffdf99]'
                  }`}>
                    {task.status}
                  </span>
                </div>
                
                <p className="mt-3 text-[#c4c7c5] leading-relaxed">
                  {task.description}
                </p>
                
                <div className="mt-6 flex items-center gap-3 border-[#37393b] pt-4 text-xs">
                  <div className="flex items-center gap-2 text-[#8e918f]">
                    <span className="h-2 w-2 rounded-full bg-[#a8c7fa]"></span>
                    <span className="font-medium text-[#c4c7c5]">Owner:</span> {task.createdBy.email}
                  </div>
                  <span className="text-[#37393b]">|</span>
                  <span className={`px-2.5 py-1 rounded-md font-medium ${
                    task.createdBy.role === 'admin' 
                      ? 'bg-[#392b4d] text-[#d7c4ff]' 
                      : 'bg-[#37393b] text-[#c4c7c5]'
                  }`}>
                    {task.createdBy.role.toUpperCase()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-[#37393b] bg-[#1e1f20]/50 p-16 text-center">
              <div className="text-[#8e918f] mb-2 text-lg">No tasks assigned to your account</div>
              <p className="text-sm text-[#5f6368]">
                Create a task via API or the admin panel to see it here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}