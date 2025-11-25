'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, GraduationCap, Hash, Calendar, FileText } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface CounterData {
  jenis: string;
  counter: number;
  formattedCounter: string;
  tahun: string | null;
  totalSurat: number;
  scope: string;
  prodiId?: string | null;
}

interface CounterReport {
  fakultas: CounterData[];
  prodi: CounterData[];
  summary: {
    totalFakultasCounters: number;
    totalProdiCounters: number;
    prodiList: string[];
  };
}

export default function LetterCounterDisplay() {
  const [data, setData] = useState<CounterReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCounters();
  }, []);

  const fetchCounters = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/letter-counters');
      if (!response.ok) throw new Error('Failed to fetch counters');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="pt-6">
          <p className="text-destructive">Error: {error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  // Group prodi data by prodi_id
  const groupedProdi = data.prodi.reduce((acc, item) => {
    const key = item.prodiId || 'Unknown';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, CounterData[]>);

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            Ringkasan Nomor Surat
          </CardTitle>
          <CardDescription>
            Informasi counter nomor surat fakultas dan program studi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-950">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Counter Fakultas</p>
                <p className="text-2xl font-bold">{data.summary.totalFakultasCounters}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-950">
              <GraduationCap className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Counter Prodi</p>
                <p className="text-2xl font-bold">{data.summary.totalProdiCounters}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-purple-50 dark:bg-purple-950">
              <FileText className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Prodi Aktif</p>
                <p className="text-2xl font-bold">{data.summary.prodiList.length}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fakultas Counters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Counter Fakultas
          </CardTitle>
          <CardDescription>
            Nomor surat terakhir tingkat fakultas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data.fakultas.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Belum ada nomor surat fakultas
            </p>
          ) : (
            <div className="space-y-3">
              {data.fakultas.map((counter, idx) => (
                <CounterCard key={idx} counter={counter} scope="fakultas" />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Prodi Counters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Counter Program Studi
          </CardTitle>
          <CardDescription>
            Nomor surat terakhir per program studi
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data.prodi.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Belum ada nomor surat prodi
            </p>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedProdi).map(([prodiId, counters]) => (
                <div key={prodiId} className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b">
                    <Badge variant="outline" className="text-sm">
                      {prodiId}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {counters.length} jenis surat
                    </span>
                  </div>
                  {counters.map((counter, idx) => (
                    <CounterCard key={idx} counter={counter} scope="prodi" />
                  ))}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function CounterCard({ counter, scope }: { counter: CounterData; scope: string }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
          <span className="text-lg font-bold text-primary">{counter.jenis}</span>
        </div>
        <div>
          <p className="font-medium">Jenis Surat: {counter.jenis}</p>
          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Tahun: {counter.tahun || 'N/A'}
            </span>
            <span className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              Total: {counter.totalSurat} surat
            </span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-muted-foreground mb-1">Counter Terakhir</p>
        <Badge variant="default" className="text-lg px-4 py-2">
          {counter.formattedCounter}
        </Badge>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-96" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>

      {[1, 2].map((i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-96" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3].map((j) => (
                <Skeleton key={j} className="h-20 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
