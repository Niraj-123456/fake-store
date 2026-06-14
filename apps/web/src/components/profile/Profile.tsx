"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { 
  User, 
  Mail, 
  MapPin, 
  ShoppingBag, 
  Settings, 
  ChevronRight 
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "ui/lib/components/ui/avatar";
import { Button } from "ui/lib/components/ui/button";
import Link from "next/link";
import SavedShippingAddressList from "../shipping/SavedShippingAddressList";

const Profile = () => {
  const { data: session } = useSession();
  const user = session?.user;

  if (!session) return null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      {/* Header Section */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200/80 shadow-xl shadow-slate-200/40 flex flex-col md:flex-row items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
          <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
          <AvatarFallback className="text-4xl font-bold bg-slate-900 text-white">
            {user?.name?.[0] || "U"}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 text-center md:text-left space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            {user?.name}
          </h1>
          <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500 font-medium">
            <Mail className="w-4 h-4" />
            <span>{user?.email}</span>
          </div>
          <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-3">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-tighter border border-blue-100">
              Verified Account
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full md:w-auto">
          <Button variant="outline" className="rounded-xl font-bold px-6">
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Navigation & Quick Stats */}
        <div className="space-y-8">
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-900/20">
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/order" className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/10 transition-colors group">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="font-bold">My Orders</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/10 transition-colors group cursor-pointer text-white/60">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5" />
                  <span className="font-bold">Settings</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 space-y-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Account Summary
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Orders</p>
                <p className="text-2xl font-black text-slate-900">-</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Reviews</p>
                <p className="text-2xl font-black text-slate-900">0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Info */}
        <div className="lg:col-span-2 space-y-12">
          {/* Saved Addresses Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-extrabold tracking-tight flex items-center gap-3">
                <MapPin className="w-6 h-6 text-slate-900" />
                Saved Addresses
              </h2>
            </div>
            
            <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 shadow-sm">
               <SavedShippingAddressList 
                 selectedAddress={undefined} 
                 onChangeShippingAddress={() => {}} 
                 onEditAddress={() => {}} 
               />
               <div className="mt-8 flex justify-end">
                 <Link href="/shipping">
                   <Button variant="outline" className="rounded-xl font-bold">
                     Manage Addresses
                   </Button>
                 </Link>
               </div>
            </div>
          </section>

          {/* Account Details Section */}
          <section>
            <h2 className="text-2xl font-extrabold tracking-tight mb-6 flex items-center gap-3">
              <User className="w-6 h-6 text-slate-900" />
              Account Details
            </h2>
            <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 shadow-sm divide-y divide-slate-100">
              <div className="py-4 flex justify-between items-center">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Full Name</span>
                <span className="font-bold text-slate-900">{user?.name}</span>
              </div>
              <div className="py-4 flex justify-between items-center">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Email</span>
                <span className="font-bold text-slate-900">{user?.email}</span>
              </div>
              <div className="py-4 flex justify-between items-center">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Member Since</span>
                <span className="font-bold text-slate-900">2026</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
