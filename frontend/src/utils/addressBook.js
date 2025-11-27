// Address Book utility for managing saved addresses
const STORAGE_KEY = 'celotap-address-book';

class AddressBookService {
  getAddresses() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading address book:', error);
      return [];
    }
  }

  addAddress(address, name, note = '') {
    try {
      const addresses = this.getAddresses();
      
      // Check if address already exists
      const existing = addresses.find(a => a.address.toLowerCase() === address.toLowerCase());
      if (existing) {
        throw new Error('Address already exists in address book');
      }

      const newEntry = {
        id: Date.now().toString(),
        address,
        name,
        note,
        createdAt: Date.now(),
        lastUsed: null,
      };

      addresses.push(newEntry);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
      return newEntry;
    } catch (error) {
      throw error;
    }
  }

  updateAddress(id, updates) {
    try {
      const addresses = this.getAddresses();
      const index = addresses.findIndex(a => a.id === id);
      
      if (index === -1) {
        throw new Error('Address not found');
      }

      addresses[index] = {
        ...addresses[index],
        ...updates,
        id, // Ensure ID doesn't change
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
      return addresses[index];
    } catch (error) {
      throw error;
    }
  }

  deleteAddress(id) {
    try {
      const addresses = this.getAddresses();
      const filtered = addresses.filter(a => a.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      throw error;
    }
  }

  markAsUsed(address) {
    try {
      const addresses = this.getAddresses();
      const entry = addresses.find(a => a.address.toLowerCase() === address.toLowerCase());
      
      if (entry) {
        this.updateAddress(entry.id, { lastUsed: Date.now() });
      }
    } catch (error) {
      console.error('Error marking address as used:', error);
    }
  }

  searchAddresses(query) {
    const addresses = this.getAddresses();
    const lowerQuery = query.toLowerCase();
    
    return addresses.filter(a => 
      a.name.toLowerCase().includes(lowerQuery) ||
      a.address.toLowerCase().includes(lowerQuery) ||
      (a.note && a.note.toLowerCase().includes(lowerQuery))
    );
  }

  getRecentAddresses(limit = 5) {
    const addresses = this.getAddresses();
    return addresses
      .filter(a => a.lastUsed)
      .sort((a, b) => b.lastUsed - a.lastUsed)
      .slice(0, limit);
  }
}

export const addressBookService = new AddressBookService();
