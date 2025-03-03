import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import MyOrders from './components/MyOrders';
import MyWishlist from './components/MyWishlist';
import SavedDetails from './components/SavedDetails';
import AccountSettings from './components/AccountSettings';
import TermsOfUse from './components/TermsOfUse';
import PrivacyPolicy from './components/PrivacyPolicy';
import UserDetail from './components/user/UserDetail';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/user/profile' element={<Profile />}>
                    <Route path='/user/profile/user-details' element={<UserDetail />} />

                    {/* <Route path='my-orders' element={<MyOrders />} />
                    <Route path='my-wishlist' element={<MyWishlist />} />
                    <Route path='saved-details' element={<SavedDetails />} />
                    <Route path='account-settings' element={<AccountSettings />} />
                    <Route path='terms-of-use' element={<TermsOfUse />} />
                    <Route path='privacy-policy' element={<PrivacyPolicy />} /> */}
                    
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
