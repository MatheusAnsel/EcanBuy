"use client";
import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number | null;
  category: string;
  description: string;
  sizes: string[];
  material: string;
}

const allProducts: Product[] = [
  { id: 1, name: "Tênis Urban Pro", price: 299.90, oldPrice: 399.90, category: "Calçados", description: "Design urbano com conforto extremo. Solado de borracha antiderrapante, palmilha anatômica e cabedal em couro sintético de alta durabilidade.", sizes: ["38", "39", "40", "41", "42", "43"], material: "Couro sintético · Borracha" },
  { id: 2, name: "Mochila Slim Carbon", price: 189.90, oldPrice: null, category: "Acessórios", description: "Mochila minimalista com acabamento em fibra de carbono. Compartimento acolchoado para notebook de até 15\", alças ergonômicas e zíper YKK.", sizes: ["Único"], material: "Fibra de carbono · Nylon" },
  { id: 3, name: "Camiseta Oversized", price: 89.90, oldPrice: 129.90, category: "Vestuário", description: "100% algodão premium. Corte oversized moderno, gola ribana reforçada e costura dupla nas mangas. Lavável à máquina.", sizes: ["P", "M", "G", "GG", "XGG"], material: "100% Algodão" },
  { id: 4, name: "Relógio Minimal", price: 459.90, oldPrice: null, category: "Acessórios", description: "Mostrador minimalista com pulseira de aço inoxidável. Resistente à água até 50m, mecanismo japonês de quartzo e visor de safira.", sizes: ["Único"], material: "Aço inoxidável · Safira" },
];

export default function ProdutoPage() {
  const params = useParams();
  const id = Number(params?.id);
  const product = allProducts.find(p => p.id === id) ?? allProducts[0];

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [qty, setQty] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .size-btn { cursor: pointer; border: none; transition: all 0.15s; }
        .qty-btn { cursor: pointer; border: none; background: transparent; transition: opacity 0.2s; }
        .qty-btn:hover { opacity: 0.5; }
        .btn-add { cursor: pointer; border: none; transition: opacity 0.2s; }
        .btn-add:hover { opacity: 0.85; }
        .btn-outline { transition: all 0.2s; }
        .btn-outline:hover { background: #111 !important; color: #f5f5f3 !important; }
        .breadcrumb-link:hover { color: #111 !important; }
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

        {/* Breadcrumb */}
        <div style={{ padding: "16px 60px", borderBottom: "1px solid #ddd", display: "flex", gap: "8px", fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#bbb", letterSpacing: "1px" }}>
          <Link href="/" className="breadcrumb-link" style={{ color: "#bbb", textDecoration: "none" }}>HOME</Link>
          <span>/</span>
          <Link href="/produtos" className="breadcrumb-link" style={{ color: "#bbb", textDecoration: "none" }}>PRODUTOS</Link>
          <span>/</span>
          <span style={{ color: "#111" }}>{product.name.toUpperCase()}</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "calc(100vh - 97px)" }}>

          {/* Imagem */}
          <div style={{ background: "#eaeae8", borderRight: "1px solid #ddd", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", minHeight: "600px" }}>
            <span style={{ fontSize: "180px", opacity: 0.08, fontFamily: "'Cormorant Garamond', serif" }}>◈</span>
            {discount && (
              <div style={{ position: "absolute", top: "40px", left: "40px", background: "#111", color: "#f5f5f3", padding: "8px 16px", fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "1px" }}>
                −{discount}%
              </div>
            )}
            <div style={{ position: "absolute", bottom: "40px", right: "40px", fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "2px", color: "#bbb", writingMode: "vertical-rl" }}>
              {product.category.toUpperCase()}
            </div>
          </div>

          {/* Detalhes */}
          <div style={{ padding: "60px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "4px", color: "#aaa", marginBottom: "12px" }}>{product.category.toUpperCase()}</p>
            <h1 style={{ fontSize: "44px", fontWeight: "300", letterSpacing: "-1px", lineHeight: "1.1", marginBottom: "28px" }}>{product.name}</h1>

            {/* Preço */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "36px", paddingBottom: "36px", borderBottom: "1px solid #ddd" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "28px", color: "#111" }}>
                R$ {product.price.toFixed(2).replace(".", ",")}
              </span>
              {product.oldPrice && (
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "18px", color: "#ccc", textDecoration: "line-through" }}>
                  R$ {product.oldPrice.toFixed(2).replace(".", ",")}
                </span>
              )}
            </div>

            <p style={{ color: "#888", fontSize: "16px", lineHeight: "1.75", marginBottom: "36px", fontWeight: "300" }}>
              {product.description}
            </p>

            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "2px", color: "#bbb", marginBottom: "12px" }}>
              MATERIAL: {product.material.toUpperCase()}
            </p>

            <div style={{ height: "1px", background: "#ddd", marginBottom: "36px" }} />

            {/* Tamanhos */}
            {product.sizes.length > 1 && (
              <div style={{ marginBottom: "32px" }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "2px", color: "#aaa", marginBottom: "14px" }}>TAMANHO</p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {product.sizes.map(size => (
                    <button key={size} onClick={() => setSelectedSize(size)} className="size-btn"
                      style={{
                        background: selectedSize === size ? "#111" : "transparent",
                        color: selectedSize === size ? "#f5f5f3" : "#888",
                        border: `1px solid ${selectedSize === size ? "#111" : "#ddd"}`,
                        padding: "10px 18px",
                        fontFamily: "'DM Mono', monospace", fontSize: "12px",
                      }}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantidade */}
            <div style={{ marginBottom: "32px" }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "2px", color: "#aaa", marginBottom: "14px" }}>QUANTIDADE</p>
              <div style={{ display: "inline-flex", alignItems: "center", border: "1px solid #ddd" }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="qty-btn"
                  style={{ padding: "10px 20px", fontFamily: "'DM Mono', monospace", fontSize: "18px", color: "#888" }}>−</button>
                <span style={{ padding: "10px 24px", fontFamily: "'DM Mono', monospace", fontSize: "14px", borderLeft: "1px solid #ddd", borderRight: "1px solid #ddd" }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="qty-btn"
                  style={{ padding: "10px 20px", fontFamily: "'DM Mono', monospace", fontSize: "18px", color: "#888" }}>+</button>
              </div>
            </div>

            {/* Botões */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button onClick={handleAdd} className="btn-add"
                style={{ background: added ? "#555" : "#111", color: "#f5f5f3", padding: "16px", fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "2px" }}>
                {added ? "✓  ADICIONADO" : "ADICIONAR AO CARRINHO"}
              </button>
              <Link href="/carrinho" className="btn-outline"
                style={{ border: "1px solid #ddd", color: "#111", padding: "16px", textAlign: "center", textDecoration: "none", fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "2px" }}>
                COMPRAR AGORA
              </Link>
            </div>

            {/* Info */}
            <div style={{ marginTop: "36px", paddingTop: "24px", borderTop: "1px solid #ddd", display: "flex", flexDirection: "column", gap: "8px" }}>
              {["Frete grátis acima de R$299", "Troca em até 30 dias", "Pagamento 100% seguro", "Enviado em até 2 dias úteis"].map(info => (
                <p key={info} style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#bbb", letterSpacing: "1px" }}>— {info}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}