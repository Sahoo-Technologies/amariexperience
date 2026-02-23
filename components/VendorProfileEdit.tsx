import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getVendorProfile, updateVendorProfile } from '../services/vendorService';
import { useNavigate } from 'react-router-dom';

const VendorProfileEdit: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setLoading(true);
    getVendorProfile(user?.id)
      .then((profile) => {
        setForm(profile);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load profile');
        setLoading(false);
      });
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      await updateVendorProfile(user?.id, form);
      setSuccess(true);
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!form) return <div className="p-8 text-red-500">{error || 'Profile not found.'}</div>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Edit Vendor Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow">
        <div>
          <label className="block font-semibold mb-1">Business Name</label>
          <input name="businessName" value={form.businessName || ''} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea name="businessDescription" value={form.businessDescription || ''} onChange={handleChange} className="w-full border rounded px-3 py-2" rows={4} />
        </div>
        <div>
          <label className="block font-semibold mb-1">Contact Email</label>
          <input name="contactEmail" value={form.contactEmail || ''} onChange={handleChange} className="w-full border rounded px-3 py-2" type="email" required />
        </div>
        <div>
          <label className="block font-semibold mb-1">Contact Phone</label>
          <input name="contactPhone" value={form.contactPhone || ''} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>
        {/* Add more fields as needed, but avoid sensitive fields */}
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-600">Profile updated successfully!</div>}
        <button type="submit" className="bg-amari-600 text-white px-6 py-2 rounded" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
      </form>
    </div>
  );
};

export default VendorProfileEdit;
