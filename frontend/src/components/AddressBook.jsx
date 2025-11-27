import React, { useState, useEffect } from 'react';
import { FaAddressBook, FaTimes, FaPlus, FaEdit, FaTrash, FaCheck, FaSearch } from 'react-icons/fa';
import { addressBookService } from '../utils/addressBook';
import { ethers } from 'ethers';

const AddressBook = ({ onSelect, onClose }) => {
  const [addresses, setAddresses] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    address: '',
    name: '',
    note: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = () => {
    const loaded = addressBookService.getAddresses();
    setAddresses(loaded);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    try {
      // Validate address
      if (!ethers.utils.isAddress(formData.address)) {
        throw new Error('Invalid Ethereum address');
      }

      if (!formData.name.trim()) {
        throw new Error('Name is required');
      }

      if (editingId) {
        addressBookService.updateAddress(editingId, formData);
      } else {
        addressBookService.addAddress(formData.address, formData.name, formData.note);
      }

      loadAddresses();
      setShowAdd(false);
      setEditingId(null);
      setFormData({ address: '', name: '', note: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (address) => {
    setFormData({
      address: address.address,
      name: address.name,
      note: address.note || '',
    });
    setEditingId(address.id);
    setShowAdd(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      addressBookService.deleteAddress(id);
      loadAddresses();
    }
  };

  const handleSelect = (address) => {
    addressBookService.markAsUsed(address.address);
    onSelect(address.address);
  };

  const filteredAddresses = searchQuery
    ? addressBookService.searchAddresses(searchQuery)
    : addresses;

  const formatAddress = (addr) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-effect rounded-3xl p-8 max-w-3xl w-full border border-celo-primary/30 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-celo rounded-xl flex items-center justify-center shadow-glow">
              <FaAddressBook className="text-2xl text-celo-dark" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Address Book</h3>
              <p className="text-sm text-gray-400">Manage saved addresses</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 hover:bg-white/10 rounded-lg transition-colors"
          >
            <FaTimes className="text-2xl text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Search and Add Button */}
        {!showAdd && (
          <div className="flex items-center space-x-3 mb-6">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search addresses..."
                className="w-full pl-10 pr-4 py-3 glass-effect rounded-xl border border-white/20 focus:border-celo-primary focus:ring-2 focus:ring-celo-primary/50 transition-all text-white placeholder-gray-500"
              />
            </div>
            <button
              onClick={() => setShowAdd(true)}
              className="px-6 py-3 bg-gradient-celo text-celo-dark font-semibold rounded-xl shadow-glow hover:shadow-glow-green transition-all duration-300 flex items-center space-x-2"
            >
              <FaPlus />
              <span>Add</span>
            </button>
          </div>
        )}

        {/* Add/Edit Form */}
        {showAdd && (
          <form onSubmit={handleSubmit} className="glass-effect rounded-2xl p-6 mb-6 space-y-4 border border-white/20">
            <h4 className="text-lg font-bold text-white mb-4">
              {editingId ? 'Edit Address' : 'Add New Address'}
            </h4>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="0x..."
                className="w-full px-4 py-3 glass-effect rounded-xl border border-white/20 focus:border-celo-primary focus:ring-2 focus:ring-celo-primary/50 transition-all text-white placeholder-gray-500"
                required
                disabled={!!editingId}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., John Doe"
                className="w-full px-4 py-3 glass-effect rounded-xl border border-white/20 focus:border-celo-primary focus:ring-2 focus:ring-celo-primary/50 transition-all text-white placeholder-gray-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Note (Optional)
              </label>
              <input
                type="text"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                placeholder="e.g., Business partner"
                className="w-full px-4 py-3 glass-effect rounded-xl border border-white/20 focus:border-celo-primary focus:ring-2 focus:ring-celo-primary/50 transition-all text-white placeholder-gray-500"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-3 bg-gradient-celo text-celo-dark font-semibold rounded-xl shadow-glow hover:shadow-glow-green transition-all duration-300"
              >
                {editingId ? 'Update' : 'Save'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAdd(false);
                  setEditingId(null);
                  setFormData({ address: '', name: '', note: '' });
                  setError('');
                }}
                className="flex-1 py-3 glass-effect border border-white/20 text-gray-300 font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Address List */}
        <div className="space-y-3">
          {filteredAddresses.length === 0 ? (
            <div className="text-center py-12">
              <FaAddressBook className="text-5xl text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">
                {searchQuery ? 'No addresses found' : 'No saved addresses yet'}
              </p>
              {!searchQuery && !showAdd && (
                <button
                  onClick={() => setShowAdd(true)}
                  className="mt-4 px-6 py-2 bg-celo-primary/20 text-celo-primary rounded-lg hover:bg-celo-primary/30 transition-colors"
                >
                  Add your first address
                </button>
              )}
            </div>
          ) : (
            filteredAddresses.map((address) => (
              <div
                key={address.id}
                className="glass-effect rounded-xl p-4 border border-white/10 hover:border-celo-primary/30 transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-lg font-semibold text-white truncate">
                        {address.name}
                      </h4>
                      {address.lastUsed && (
                        <span className="text-xs px-2 py-1 bg-celo-green/20 text-celo-green rounded">
                          Recent
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-mono text-gray-400 mb-1">
                      {formatAddress(address.address)}
                    </p>
                    {address.note && (
                      <p className="text-sm text-gray-500">{address.note}</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleSelect(address)}
                      className="p-2 bg-celo-primary/20 text-celo-primary rounded-lg hover:bg-celo-primary/30 transition-colors"
                      title="Use this address"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleEdit(address)}
                      className="p-2 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition-colors"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressBook;
