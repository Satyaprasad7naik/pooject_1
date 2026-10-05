'use client';

import React, { useState } from 'react';

export default function EnterpriseDashboard() {
  const [sku, setSku] = useState('SKU-1001');
  const [pricingData, setPricingData] = useState<any>(null);
  const [inventoryData, setInventoryData] = useState<any>(null);
  const [carbonData, setCarbonData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchModuleData = async () => {
    setLoading(true);
    const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
    const baseUrl = `http://${host}:8080`;
    try {
      const [priceRes, invRes, carbonRes] = await Promise.all([
        fetch(`${baseUrl}/api/v1/pricing/${sku}`).then(r => r.json()).catch((err) => ({ error: String(err) })),
        fetch(`${baseUrl}/api/v1/inventory/availability/${sku}`).then(r => r.json()).catch((err) => ({ error: String(err) })),
        fetch(`${baseUrl}/api/v1/carbon/${sku}`).then(r => r.json()).catch((err) => ({ error: String(err) })),
      ]);
      setPricingData(priceRes);
      setInventoryData(invRes);
      setCarbonData(carbonRes);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background p-4 md:p-6 lg:p-8 font-sans">
      <div className="mx-auto max-w-screen-2xl">
        
        {/* Header Banner */}
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase rounded-md bg-surface text-muted border border-border">
                Next.js 14 App Router
              </span>
              <span className="px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase rounded-md bg-surface text-muted border border-border">
                Palantir Foundry Architecture
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-zinc-100 tracking-tight">
              DerivInsight Enterprise Hub
            </h1>
            <p className="text-muted text-sm mt-1">
              Retail Digital Twin, Dynamic Pricing, Scope 1–3 Carbon Accounting & JWT Auth Gateway
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="http://localhost:8080"
              target="_top"
              className="px-4 py-2 text-xs font-medium rounded-lg bg-surface hover:bg-zinc-800 text-zinc-300 border border-border transition-colors flex items-center gap-2"
            >
              <span>← Back to Query Assistant</span>
            </a>
            <div className="flex items-center space-x-3 bg-surface border border-border px-4 py-2 rounded-lg">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              <div className="text-xs">
                <div className="text-muted">Gateway Status</div>
                <div className="font-medium text-zinc-200">Port 8080 Operational</div>
              </div>
            </div>
          </div>
        </header>

        {/* SKU Search & Trigger Bar */}
        <section className="bg-surface border border-border p-6 rounded-xl shadow-sm mb-8 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-zinc-100 uppercase tracking-wide">Enterprise SKU Inspector</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder="Enter SKU (e.g. SKU-1001)"
              className="flex-1 bg-background border border-border rounded-lg px-4 py-2.5 text-zinc-100 placeholder-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm"
            />
            <button
              onClick={fetchModuleData}
              disabled={loading}
              className="bg-primary hover:opacity-90 text-white font-medium px-8 py-2.5 rounded-lg transition-all disabled:opacity-50 text-sm whitespace-nowrap"
            >
              {loading ? 'Evaluating...' : 'Query Enterprise Ontology'}
            </button>
          </div>
        </section>

        {/* 3 Enterprise Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Module 1: Dynamic Pricing */}
          <div className="bg-surface border border-border p-6 rounded-xl shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-zinc-100 uppercase tracking-wide">Dynamic Pricing Engine</h3>
              <span className="text-[10px] bg-background text-muted border border-border px-2 py-1 rounded uppercase tracking-wider">Elasticity Alg.</span>
            </div>
            {pricingData ? (
              <div className="space-y-4 text-sm flex-1">
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted">Base Price</span>
                  <span className="font-medium text-zinc-200">${pricingData.base_price}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted">Recommended</span>
                  <span className="font-semibold text-emerald-500">${pricingData.recommended_price}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted">Discount / Surcharge</span>
                  <span className="font-medium text-zinc-200">{pricingData.discount_pct}%</span>
                </div>
                <p className="text-xs text-muted bg-background p-4 rounded-lg border border-border mt-4 leading-relaxed">
                  {pricingData.reasoning}
                </p>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-xs text-muted italic py-8 text-center">
                Click &quot;Query Enterprise Ontology&quot; to fetch real-time price recommendation.
              </div>
            )}
          </div>

          {/* Module 2: Supply Chain Digital Twin */}
          <div className="bg-surface border border-border p-6 rounded-xl shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-zinc-100 uppercase tracking-wide">Supply Chain Twin</h3>
              <span className="text-[10px] bg-background text-muted border border-border px-2 py-1 rounded uppercase tracking-wider">5 Hubs (IN)</span>
            </div>
            {inventoryData && Array.isArray(inventoryData) ? (
              <div className="space-y-3 text-sm flex-1">
                <div className="flex justify-between border-b border-border pb-3 mb-2">
                  <span className="text-muted">Active Warehouses</span>
                  <span className="font-medium text-zinc-200">{inventoryData.length}</span>
                </div>
                {inventoryData.map((wh: any, idx: number) => (
                  <div key={idx} className="bg-background p-3 rounded-lg border border-border text-xs flex justify-between items-center">
                    <div>
                      <div className="font-medium text-zinc-200 mb-0.5">{wh.warehouse_name}</div>
                      <div className="text-muted">{wh.warehouse_city}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-zinc-200 mb-0.5">{wh.quantity_available} units</div>
                      <div className="text-muted">C&amp;C: {wh.click_collect_ready ? 'Ready' : 'N/A'}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-xs text-muted italic py-8 text-center">
                Click &quot;Query Enterprise Ontology&quot; to inspect live inventory reserves.
              </div>
            )}
          </div>

          {/* Module 3: Scope 1-3 Carbon Accounting */}
          <div className="bg-surface border border-border p-6 rounded-xl shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-zinc-100 uppercase tracking-wide">Scope 1–3 Carbon</h3>
              <span className="text-[10px] bg-background text-muted border border-border px-2 py-1 rounded uppercase tracking-wider">GHG Protocol</span>
            </div>
            {carbonData ? (
              <div className="space-y-4 text-sm flex-1">
                <div className="flex justify-between border-b border-border pb-3 items-center">
                  <span className="text-muted">Total Lifecycle CO2e</span>
                  <span className="font-semibold text-zinc-200">{carbonData.total_kg_co2e} kg</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3 items-center">
                  <span className="text-muted">ESG Rating Grade</span>
                  <span className="font-medium px-2 py-1 rounded text-[10px] uppercase tracking-wider bg-background text-zinc-300 border border-border">
                    Grade {carbonData.label}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center text-xs pt-2">
                  <div className="bg-background p-3 rounded-lg border border-border flex flex-col gap-1">
                    <span className="text-muted">Scope 1</span>
                    <span className="font-medium text-zinc-200">{carbonData.scope1_kg}kg</span>
                  </div>
                  <div className="bg-background p-3 rounded-lg border border-border flex flex-col gap-1">
                    <span className="text-muted">Scope 2</span>
                    <span className="font-medium text-zinc-200">{carbonData.scope2_kg}kg</span>
                  </div>
                  <div className="bg-background p-3 rounded-lg border border-border flex flex-col gap-1">
                    <span className="text-muted">Scope 3</span>
                    <span className="font-medium text-zinc-200">{carbonData.scope3_kg}kg</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-xs text-muted italic py-8 text-center">
                Click &quot;Query Enterprise Ontology&quot; to calculate lifecycle emissions score.
              </div>
            )}
          </div>

        </div>

        {/* Footer Info */}
        <footer className="text-center text-[10px] uppercase tracking-widest text-muted border-t border-border pt-8 mt-8 pb-4">
          DerivInsight Enterprise Architecture &bull; Next.js 14 &bull; Tailwind CSS &bull; FastAPI
        </footer>
      </div>
    </main>
  );
}

// 'use client';

// import React, { useState } from 'react';

// export default function Home() {
//   const [sku, setSku] = useState('SKU-1001');
//   const [pricingData, setPricingData] = useState<any>(null);
//   const [inventoryData, setInventoryData] = useState<any>(null);
//   const [carbonData, setCarbonData] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   const fetchModuleData = async () => {
//     setLoading(true);
//     const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
//     const baseUrl = `http://${host}:8080`;
//     try {
//       const [priceRes, invRes, carbonRes] = await Promise.all([
//         fetch(`${baseUrl}/api/v1/pricing/${sku}`).then(r => r.json()).catch((err) => ({ error: String(err) })),
//         fetch(`${baseUrl}/api/v1/inventory/availability/${sku}`).then(r => r.json()).catch((err) => ({ error: String(err) })),
//         fetch(`${baseUrl}/api/v1/carbon/${sku}`).then(r => r.json()).catch((err) => ({ error: String(err) })),
//       ]);
//       setPricingData(priceRes);
//       setInventoryData(invRes);
//       setCarbonData(carbonRes);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen p-8 max-w-7xl mx-auto font-sans">
//       {/* Header Banner */}
//       <header className="border-b border-slate-800 pb-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <div className="flex items-center space-x-3">
//             <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
//               NEXT.JS 14 APP ROUTER
//             </span>
//             <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
//               PALANTIR FOUNDRY ARCHITECTURE
//             </span>
//           </div>
//           <h1 className="text-3xl font-extrabold text-white mt-2 tracking-tight">
//             DerivInsight Enterprise Hub
//           </h1>
//           <p className="text-slate-400 text-sm mt-1">
//             Retail Digital Twin, Dynamic Pricing, Scope 1–3 Carbon Accounting & JWT Auth Gateway
//           </p>
//         </div>
//         <div className="flex items-center space-x-4">
//           <a
//             href="http://localhost:8080"
//             target="_top"
//             className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-800/60 transition-all flex items-center gap-2"
//           >
//             <span>← Back to Project 1 (Query Assistant)</span>
//           </a>
//           <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 p-3 rounded-xl">
//             <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></div>
//             <div className="text-xs">
//               <div className="text-slate-400">Gateway Status</div>
//               <div className="font-semibold text-slate-200">Port 8080 Operational</div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* SKU Search & Trigger Bar */}
//       <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl mb-8 shadow-xl">
//         <h2 className="text-lg font-bold text-white mb-4">Enterprise SKU Inspector</h2>
//         <div className="flex flex-col sm:flex-row gap-4">
//           <input
//             type="text"
//             value={sku}
//             onChange={(e) => setSku(e.target.value)}
//             placeholder="Enter SKU (e.g. SKU-1001)"
//             className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
//           />
//           <button
//             onClick={fetchModuleData}
//             disabled={loading}
//             className="bg-cyan-600 hover:bg-cyan-500 text-black font-bold px-8 py-3 rounded-xl transition-all disabled:opacity-50"
//           >
//             {loading ? 'Evaluating...' : 'Query Enterprise Ontology'}
//           </button>
//         </div>
//       </section>

//       {/* 3 Enterprise Module Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         {/* Module 1: Dynamic Pricing */}
//         <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-cyan-500/40 transition-all">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-md font-bold text-cyan-400">Dynamic Pricing Engine</h3>
//             <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">Elasticity Alg.</span>
//           </div>
//           {pricingData ? (
//             <div className="space-y-3 text-sm">
//               <div className="flex justify-between border-b border-slate-800 pb-2">
//                 <span className="text-slate-400">Base Price:</span>
//                 <span className="font-semibold">${pricingData.base_price}</span>
//               </div>
//               <div className="flex justify-between border-b border-slate-800 pb-2">
//                 <span className="text-slate-400">Recommended:</span>
//                 <span className="font-bold text-emerald-400">${pricingData.recommended_price}</span>
//               </div>
//               <div className="flex justify-between border-b border-slate-800 pb-2">
//                 <span className="text-slate-400">Discount / Surcharge:</span>
//                 <span className="font-semibold text-amber-400">{pricingData.discount_pct}%</span>
//               </div>
//               <p className="text-xs text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
//                 {pricingData.reasoning}
//               </p>
//             </div>
//           ) : (
//             <p className="text-xs text-slate-500 italic py-6">
//               Click &quot;Query Enterprise Ontology&quot; to fetch real-time price recommendation.
//             </p>
//           )}
//         </div>

//         {/* Module 2: Supply Chain Digital Twin */}
//         <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/40 transition-all">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-md font-bold text-emerald-400">Supply Chain Twin</h3>
//             <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">5 Hubs (IN)</span>
//           </div>
//           {inventoryData && Array.isArray(inventoryData) ? (
//             <div className="space-y-3 text-sm">
//               <div className="flex justify-between border-b border-slate-800 pb-2">
//                 <span className="text-slate-400">Active Warehouses:</span>
//                 <span className="font-semibold text-white">{inventoryData.length}</span>
//               </div>
//               {inventoryData.map((wh: any, idx: number) => (
//                 <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs flex justify-between items-center">
//                   <div>
//                     <div className="font-semibold text-white">{wh.warehouse_name}</div>
//                     <div className="text-slate-500">{wh.warehouse_city}</div>
//                   </div>
//                   <div className="text-right">
//                     <div className="font-bold text-emerald-400">{wh.quantity_available} units</div>
//                     <div className="text-slate-500">C&amp;C: {wh.click_collect_ready ? 'Ready' : 'N/A'}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-xs text-slate-500 italic py-6">
//               Click &quot;Query Enterprise Ontology&quot; to inspect live inventory reserves.
//             </p>
//           )}
//         </div>

//         {/* Module 3: Scope 1-3 Carbon Accounting */}
//         <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-purple-500/40 transition-all">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-md font-bold text-purple-400">Scope 1–3 Carbon</h3>
//             <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">GHG Protocol</span>
//           </div>
//           {carbonData ? (
//             <div className="space-y-3 text-sm">
//               <div className="flex justify-between border-b border-slate-800 pb-2 items-center">
//                 <span className="text-slate-400">Total Lifecycle CO2e:</span>
//                 <span className="font-bold text-purple-300 text-lg">{carbonData.total_kg_co2e} kg</span>
//               </div>
//               <div className="flex justify-between border-b border-slate-800 pb-2">
//                 <span className="text-slate-400">ESG Rating Grade:</span>
//                 <span className="font-bold px-2 py-0.5 rounded text-xs bg-purple-950 text-purple-300 border border-purple-800">
//                   Grade {carbonData.label}
//                 </span>
//               </div>
//               <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2">
//                 <div className="bg-slate-950 p-2 rounded border border-slate-800">
//                   <div className="text-slate-500">Scope 1</div>
//                   <div className="font-semibold">{carbonData.scope1_kg} kg</div>
//                 </div>
//                 <div className="bg-slate-950 p-2 rounded border border-slate-800">
//                   <div className="text-slate-500">Scope 2</div>
//                   <div className="font-semibold">{carbonData.scope2_kg} kg</div>
//                 </div>
//                 <div className="bg-slate-950 p-2 rounded border border-slate-800">
//                   <div className="text-slate-500">Scope 3</div>
//                   <div className="font-semibold">{carbonData.scope3_kg} kg</div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <p className="text-xs text-slate-500 italic py-6">
//               Click &quot;Query Enterprise Ontology&quot; to calculate lifecycle emissions score.
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Footer Info */}
//       <footer className="text-center text-xs text-slate-600 border-t border-slate-800 pt-6">
//         DerivInsight Enterprise Architecture Modernization &bull; Built with Next.js 14, React 18, Tailwind CSS &amp; FastAPI Backend
//       </footer>
//     </main>
//   );
// }
