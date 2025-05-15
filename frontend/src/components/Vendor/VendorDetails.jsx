import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Copy,
  Mail,
  MapPin,
  Phone,
  User,
} from 'lucide-react';
import useVendorStore from '../../store/useVendorStore'; // adjust the import path as needed

const VendorDetails = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();

  const { vendor, loading, fetchVendorById } = useVendorStore();

  useEffect(() => {
    if (vendorId) {
      fetchVendorById(vendorId);
    }
  }, [vendorId, fetchVendorById]);

  if (loading || !vendor) {
    return (
      <div className="min-h-screen bg-[#2d2d2d] text-white flex flex-col justify-center items-center p-4">
        <span className="loading loading-spinner text-[#ff851b]"></span>
      </div>
    );
  }

  const copyVendorLink = (id) => {
    const url = `${window.location.origin}/dashboard/vendors/${id}`;
    navigator.clipboard.writeText(url);
    alert(`Link copied: ${url}`);
  };

  return (
    <div className="min-h-screen bg-[#2d2d2d] text-white p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard/vendors')}
            className="btn btn-sm border border-[#ff851b] text-[#ff851b] hover:bg-[#ff851b] hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#ff851b]">{vendor.name}</h1>
            <p className="text-sm text-[#a0a0a0]">Vendor ID: {vendor._id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => copyVendorLink(vendor._id)}
            className="btn btn-sm border border-white text-white"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Link
          </button>
          <button className="btn btn-sm bg-[#ff851b] text-white hover:bg-orange-500">
            Edit Vendor
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card title="Status" className="min-h-full">
          <div className="flex items-center justify-between">
            <div className="badge border border-[#ff851b] text-[#ff851b] bg-transparent">
              {vendor.status}
            </div>
            <p className="text-sm text-[#a0a0a0]">
              Pending Orders: {vendor.pendingOrders?.length || 0}
            </p>
          </div>
        </Card>

        <Card title="GST Number">
          <p className="text-lg">{vendor.gstNo || 'N/A'}</p>
        </Card>

        <Card title="Location">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#a0a0a0]" />
            <span>{vendor.address}</span>
          </div>
        </Card>
      </div>

      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          <Card title="Contact Information" className="min-h-full">
            <div className="space-y-3 text-sm">
              <InfoRow icon={<User />} label="Name" value={vendor.name} />
              <InfoRow icon={<Phone />} label="Phone" value={vendor.phone} />
              <InfoRow icon={<Mail />} label="Email" value={vendor.email} />
              <InfoRow icon={<MapPin />} label="Address" value={vendor.address} />
            </div>
          </Card>
        </div>

        <div className="flex-1 space-y-6">
          <Card title="Business Details" className="min-h-full">
            <Row label="GST Number" value={vendor.gstNo || 'N/A'} />
            <Row label="Status" value={vendor.status} />
          </Card>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, subtitle, children, className }) => (
  <div className={`bg-[#1e1e1e] p-6 rounded-xl shadow-lg border border-gray-700 ${className}`}>
    <h2 className="text-lg font-semibold text-[#ff851b]">{title}</h2>
    {subtitle && <p className="text-sm text-[#a0a0a0] mb-4">{subtitle}</p>}
    <div>{children}</div>
  </div>
);

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-2">
    <div className="mt-1 text-[#a0a0a0]">{icon}</div>
    <div>
      <div className="font-medium text-white">{label}</div>
      <div className="text-[#a0a0a0]">{value}</div>
    </div>
  </div>
);

const Row = ({ label, value }) => (
  <div className="flex justify-between py-2 text-sm">
    <span className="text-[#a0a0a0]">{label}:</span>
    <span className="text-white">{value}</span>
  </div>
);

function getStatusBadge(status) {
  switch (status) {
    case 'Processing':
      return 'border border-yellow-400 text-yellow-400 bg-transparent';
    case 'Ready for Delivery':
      return 'border border-cyan-400 text-cyan-400 bg-transparent';
    case 'Out for Delivery':
      return 'border border-blue-400 text-blue-400 bg-transparent';
    default:
      return 'border border-gray-400 text-gray-400 bg-transparent';
  }
}

export default VendorDetails;
