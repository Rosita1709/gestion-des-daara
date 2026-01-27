import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', students: 4200, tutors: 280 },
  { month: 'Fév', students: 4500, tutors: 295 },
  { month: 'Mar', students: 4800, tutors: 310 },
  { month: 'Avr', students: 5200, tutors: 325 },
  { month: 'Mai', students: 5600, tutors: 340 },
  { month: 'Juin', students: 5900, tutors: 355 },
  { month: 'Juil', students: 5400, tutors: 350 },
  { month: 'Août', students: 5100, tutors: 345 },
  { month: 'Sep', students: 6200, tutors: 380 },
  { month: 'Oct', students: 6800, tutors: 410 },
  { month: 'Nov', students: 7200, tutors: 435 },
  { month: 'Déc', students: 7600, tutors: 460 },
];

export function PerformanceChart() {
  return (
    <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border/50">
        <h3 className="text-lg font-semibold text-foreground">Croissance annuelle</h3>
        <p className="text-sm text-muted-foreground mt-1">Évolution des inscriptions sur l'année</p>
      </div>
      <div className="p-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorTutors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(174, 72%, 40%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(174, 72%, 40%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(215, 16%, 47%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(215, 16%, 47%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '1px solid hsl(214, 32%, 91%)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              labelStyle={{ color: 'hsl(222, 47%, 11%)', fontWeight: 600 }}
            />
            <Area
              type="monotone"
              dataKey="students"
              stroke="hsl(221, 83%, 53%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorStudents)"
              name="Étudiants"
            />
            <Area
              type="monotone"
              dataKey="tutors"
              stroke="hsl(174, 72%, 40%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorTutors)"
              name="Tuteurs"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
