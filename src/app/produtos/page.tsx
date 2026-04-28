"use client";
import Link from "next/link";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number | null;
  category: string;
  isNew: boolean;
}

const allProducts: Product[] = [
  { id: 1, name: "Tênis Urban Pro", price: 299.90, oldPrice: 399.90, category: "Calçados", isNew: false },
  { id: 2, name: "Mochila Slim Carbon", price: 189.90, oldPrice: null, category: "Acessórios", isNew: true },
  { id: 3, name: "Camiseta Oversized", price: 89.90, oldPrice: 129.90, category: "Vestuário", isNew: false },
  { id: 4, name: "Relógio Minimal", price: 459.90, oldPrice: null, category: "Acessórios", isNew: false },
  { id: 5, name: "Calça Cargo", price: 199.90, oldPrice: 249.90, category: "Vestuário", isNew: false },
  { id: 6, name: "Óculos Retrô", price: 149.90, oldPrice: null, category: "Acessórios", isNew: true },
  { id: 7, name: "Tênis Skate Classic", price: 259.90, oldPrice: 319.90, category: "Calçados", isNew: false },
  { id: 8, name: "Boné Snapback", price: 79.90, oldPrice: null, category: "Acessórios", isNew: false },
];

const categories = ["Todos", "Calçados", "Vestuário", "Acessórios"];

export default function Produtos() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [sortBy, setSortBy] = useState("relevancia");
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered = allProducts
    .filter(p => activeCategory === "Todos" || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === "menor") return a.price - b.price;
      if (sortBy === "maior") return b.price - a.price;
      return 0;
    });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .card-hover { transition: transform 0.3s ease; }
        .card-hover:hover { transform: translateY(-4px); }
        .filter-btn { transition: all 0.2s; cursor: pointer; border: none; }
        .nav-link:hover { color: #111 !important; }
      `}</style>

      <div style={{ background: "#f5f5f3", minHeight: "100vh", fontFamily: "'Cormorant Garamond', serif", color: "#111" }}>

        {/* Header */}
        <header style={{ borderBottom: "1px solid #ddd", padding: "0 60px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px", background: "#f5f5f3" }}>
          <Link href="/" style={{ fontSize: "18px", fontWeight: "600", letterSpacing: "6px", color: "#111", textDecoration: "none" }}>ECANBUY</Link>
          <Link href="/carrinho" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "#111", fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "1px" }}>
            CARRINHO
            <span style={{ background: "#111", color: "#f5f5f3", borderRadius: "50%", width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px" }}>0</span>
          </Link>
        </header>

        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "60px" }}>

          {/* Título */}
          <div style={{ marginBottom: "56px", borderBottom: "1px solid #ddd", paddingBottom: "24px" }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "4px", color: "#aaa", marginBottom: "10px" }}>CATÁLOGO</p>
            <h1 style={{ fontSize: "56px", fontWeight: "300", letterSpacing: "-2px" }}>Produtos</h1>
          </div>

          {/* Filtros */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
            <div style={{ display: "flex", gap: "0", border: "1px solid #ddd" }}>
              {categories.map((cat, i) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className="filter-btn"
                  style={{
                    background: activeCategory === cat ? "#111" : "transparent",
                    color: activeCategory === cat ? "#f5f5f3" : "#888",
                    padding: "10px 22px",
                    fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "1px",
                    borderRight: i < categories.length - 1 ? "1px solid #ddd" : "none",
                  }}>
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              style={{ background: "transparent", color: "#888", border: "1px solid #ddd", padding: "10px 16px", fontFamily: "'DM Mono', monospace", fontSize: "10px", cursor: "pointer", outline: "none", letterSpacing: "1px" }}>
              <option value="relevancia">RELEVÂNCIA</option>
              <option value="menor">MENOR PREÇO</option>
              <option value="maior">MAIOR PREÇO</option>
            </select>
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1px", background: "#ddd", border: "1px solid #ddd", marginBottom: "48px" }}>
            {filtered.map(p => (
              <Link key={p.id} href={`/produto/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div className="card-hover" style={{ background: "#f5f5f3" }}
                  onMouseEnter={() => setHovered(p.id)}
                  onMouseLeave={() => setHovered(null)}>
                  <div style={{ aspectRatio: "3/4", background: hovered === p.id ? "#dededc" : "#eaeae8", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s", position: "relative" }}>
                    <span style={{ fontSize: "80px", opacity: 0.1, fontFamily: "'Cormorant Garamond', serif" }}>◈</span>
                    {p.oldPrice && (
                      <span style={{ position: "absolute", top: "16px", left: "16px", background: "#111", color: "#f5f5f3", padding: "4px 10px", fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "1px" }}>
                        OFERTA
                      </span>
                    )}
                    {p.isNew && (
                      <span style={{ position: "absolute", top: p.oldPrice ? "44px" : "16px", left: "16px", background: "#555", color: "#f5f5f3", padding: "4px 10px", fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "1px" }}>
                        NOVO
                      </span>
                    )}
                  </div>
                  <div style={{ padding: "20px 20px 24px" }}>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "3px", color: "#bbb", marginBottom: "6px" }}>{p.category.toUpperCase()}</p>
                    <p style={{ fontSize: "18px", fontWeight: "400", marginBottom: "10px" }}>{p.name}</p>
                    <div style={{ display: "flex", gap: "10px", alignItems: "baseline" }}>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "14px", color: "#111" }}>R$ {p.price.toFixed(2).replace(".", ",")}</span>
                      {p.oldPrice && <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#ccc", textDecoration: "line-through" }}>R$ {p.oldPrice.toFixed(2).replace(".", ",")}</span>}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#bbb", textAlign: "center", letterSpacing: "2px" }}>
            {filtered.length} PRODUTO{filtered.length !== 1 ? "S" : ""} ENCONTRADO{filtered.length !== 1 ? "S" : ""}
          </p>
        </div>
      </div>
    </>
  );
}