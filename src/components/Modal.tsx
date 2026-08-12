import React from "react";
import { X, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
}

interface ServiceModalContentProps {
  icon: string;
  english: string;
  title: string;
  desc: string;
  features: string[];
}

export function ServiceModalContent({ icon, english, title, desc, features }: ServiceModalContentProps) {
  return (
    <div>
      <div className="bg-[#1c1a19] p-8 text-center">
        <span className="text-5xl mb-3 block">{icon}</span>
        <span className="text-xs uppercase tracking-widest text-[#b89b72] font-semibold font-mono mb-2 block">
          {english}
        </span>
        <h3 className="font-serif text-2xl text-white tracking-wide">{title}</h3>
      </div>
      <div className="p-8">
        <p className="text-sm text-stone-600 font-light leading-relaxed mb-6">{desc}</p>
        <div className="border-t border-[#eaeae1] pt-6">
          <h4 className="text-xs uppercase tracking-widest text-[#b89b72] font-semibold mb-4">Chi Tiết Dịch Vụ</h4>
          <ul className="space-y-3">
            {features.map((f, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-stone-700">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b89b72] mt-2 shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 pt-6 border-t border-[#eaeae1]">
          <Link
            to="/lien-he"
            className="flex items-center justify-center gap-2 w-full py-4 bg-[#b89b72] text-white text-sm tracking-widest uppercase font-bold hover:bg-[#a08a62] transition-luxury"
          >
            <ExternalLink className="w-4 h-4" />
            Đăng Ký Tư Vấn
          </Link>
        </div>
      </div>
    </div>
  );
}
