import Link from "next/link";

interface Props {
  page: number;
  lastPage: number;
}

export default function Pagination({ page, lastPage }: Props) {
  return (
    <div style={{ display: "flex", gap: 12, margin: 20 }}>
      {page > 1 && <Link href={`/?page=${page - 1}`}>Prev</Link>}

      <span>
        {page} / {lastPage}
      </span>

      {page < lastPage && <Link href={`/?page=${page + 1}`}>Next</Link>}
    </div>
  );
}
