/* eslint-disable react/jsx-no-useless-fragment */
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '@pages/Home';
import Entry from '@pages/records/Entry';
import RecordsSearch from '@pages/records/RecordsSearch';
import Vitals from '@pages/opd/Vitals';
import Consultation from '@pages/consultation/Consultation';
import Pharmacy from '@pages/pharmacy/Pharmacy';
import Finance from '@pages/finance/Finance';
import Laboratory from '@pages/laboratory/Laboratory';
import Ward from '@pages/ward/Ward';
import Maternal from '@pages/maternal/Maternal';

import Sidebar from '@components/sidebar/Sidebar';
import QuickView from '@components/QuickView';
import Search from '@components/Search';

import Header from '@components/sidebar/Header';
import Footer from '@components/sidebar/Footer';

import './App.css';

import { UserProvider } from '@database/providers/UserProvider';
import { NanoProvider } from '@database/providers/NanoProvider';

import Routes from '../menrva/routes';

export default function App() {
  return (
    <Router>
      <NanoProvider>
        <UserProvider>
          <Switch>
            <>
              <Sidebar />
              <div className="page-container">
                <Header />
                <>
                  <Route path={Routes.Home.path} Component={Home} />
                  <Route path={Routes.Records.Entry.path} Component={Entry} />
                  <Route path={Routes.Vitals.path} Component={Vitals} />
                  <Route
                    path={Routes.Records.Search.path}
                    Component={RecordsSearch}
                  />
                  <Route
                    path={Routes.Consultation.path}
                    Component={Consultation}
                  />
                  <Route path={Routes.Ward.path} Component={Ward} />
                  <Route path={Routes.Maternal.path} Component={Maternal} />
                  <Route path={Routes.Finance.path} Component={Finance} />
                  <Route path={Routes.Pharmacy.path} Component={Pharmacy} />
                  <Route path={Routes.Laboratory.path} Component={Laboratory} />
                </>
                <Footer />
              </div>
              <QuickView />
              <Search />
            </>
          </Switch>
        </UserProvider>
      </NanoProvider>
    </Router>
  );
}
