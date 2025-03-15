"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

interface DepartmentBorrowing {
  department: string
  value: number
  color: string
}

interface BorrowingByDepartmentChartProps {
  data: DepartmentBorrowing[]
  showDetails?: boolean
}

export function BorrowingByDepartmentChart({ data, showDetails = false }: BorrowingByDepartmentChartProps) {
  return (
    <div className="flex flex-col">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="department"
            label={({ department, percent }) => `${department}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} peminjaman`, "Jumlah"]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {showDetails && (
        <div className="mt-4 space-y-2">
          <h4 className="font-medium">Detail Peminjaman per Departemen</h4>
          <div className="max-h-60 overflow-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-2 text-left">Departemen</th>
                  <th className="pb-2 text-right">Jumlah</th>
                  <th className="pb-2 text-right">Persentase</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  const total = data.reduce((sum, item) => sum + item.value, 0)
                  const percentage = ((item.value / total) * 100).toFixed(1)

                  return (
                    <tr key={index} className="border-b">
                      <td className="py-2 text-left">{item.department}</td>
                      <td className="py-2 text-right">{item.value}</td>
                      <td className="py-2 text-right">{percentage}%</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

