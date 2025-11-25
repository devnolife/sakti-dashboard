import LetterCounterDisplay from '@/components/admin/letter-counter-display';

export default function LetterCountersPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Nomor Surat Terakhir</h1>
        <p className="text-muted-foreground">
          Pantau nomor surat terakhir untuk fakultas dan semua program studi
        </p>
      </div>

      <LetterCounterDisplay />
    </div>
  );
}
