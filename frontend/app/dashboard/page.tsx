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
      } catch (err) {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [router]);

  if (loading) return <div className="p-10 text-center">Loading your tasks...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task Dashboard</h1>
          <button 
            onClick={async () => {
              await api.post('/auth/logout');
              router.push('/login');
            }}
            className="text-sm text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-4">
          {tasks.length > 0 ? (
            tasks.map((task: any) => (
              <div key={task._id} className="rounded-lg border bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{task.title}</h3>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                    task.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.status}
                  </span>
                </div>
                <p className="mt-2 text-gray-600">{task.description}</p>
                <div className="mt-4 text-xs text-gray-400">
                  Created by: {task.createdBy.email} ({task.createdBy.role})
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No tasks found. Create one in Postman to see it here!</p>
          )}
        </div>
      </div>
    </div>
  );
}