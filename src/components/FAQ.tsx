import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { faqs } from '../data';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('q1'); // Open first FAQ by default
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'rental', label: 'Two-Wheeler Rental' },
    { id: 'booking', label: 'Booking & Fees' },
    { id: 'safety', label: 'Safety & Help' },
    { id: 'payment', label: 'Payments' },
  ];

  const filteredFaqs = faqs.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-20 relative z-10 border-t border-slate-200/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-black tracking-widest text-yellow-600 uppercase">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight mt-2">
            Got Questions? We Have Answers
          </h2>
          <p className="text-sm text-zinc-600 mt-3 font-medium">
            Find quick answers regarding shared seats, payment wallets, SOS, and cancellation guidelines.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 glass-input border border-white/60 rounded-xl px-4 py-3 flex items-center gap-3 shadow-inner">
              <Search className="w-4 h-4 text-zinc-400 shrink-0" />
              <input
                type="text"
                id="faq-search-input"
                placeholder="Search queries, keywords (e.g. SOS, OTP)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-0 p-0 text-xs font-semibold text-zinc-800 focus:ring-0 focus:outline-none placeholder-zinc-400"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`faq-tab-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold shrink-0 transition-all cursor-pointer shadow-sm ${
                  selectedCategory === cat.id
                    ? 'bg-yellow-400 text-black shadow'
                    : 'bg-white/80 text-zinc-600 hover:text-zinc-900 border border-slate-200/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-3.5">
            {filteredFaqs.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  id={`faq-item-${item.id}`}
                  className={`border rounded-xl transition-all duration-300 ${
                    isOpen
                      ? 'bg-yellow-400/5 border-yellow-400/30 shadow-sm'
                      : 'glass-card border-white/40 hover:border-zinc-300 shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="w-full px-5 py-4 text-left flex items-start justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-start gap-3.5">
                      <HelpCircle className={`w-4.5 h-4.5 mt-0.5 shrink-0 ${isOpen ? 'text-yellow-600' : 'text-zinc-400'}`} />
                      <span className="text-xs md:text-sm font-bold text-zinc-800 tracking-tight leading-normal">
                        {item.question}
                      </span>
                    </div>
                    <span className="text-zinc-400 shrink-0 mt-0.5">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>
                  
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-100 text-xs text-zinc-600 leading-relaxed font-medium animate-fade-in">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white/40 border border-slate-200/50 rounded-xl shadow-sm">
            <span className="text-sm font-semibold text-zinc-500">
              No frequently asked questions match your criteria.
            </span>
          </div>
        )}

      </div>
    </section>
  );
}
