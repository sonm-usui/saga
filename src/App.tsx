import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { appPaths } from './constants';
import { DefaultLayout, GlobalNotFound } from './pages/Global';
import { Home } from './pages/Home/Home';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import { ThemeHandler } from './Components/UI/ThemeHandler/ThemeHandler';
import './index.scss';
import 'react-phone-number-input/style.css';
import Projects from './pages/Projects/Projects';
import About from './pages/About/About';
import { ProjectDetail } from './pages/ProjectDetail/ProjectDetail';
import { OrganizationDetail } from './pages/OrganizationDetail/OrganizationDetail';
import { ProposeProject } from './pages';
import { DueDiligenceForm } from './pages/DueDiligence/DueDiligenceForm';
import {
  OrganisationDetail,
  Organisations,
  Projects as AdminProjects,
  ProjectDetail as AdminProjectDetail,
  CreateDonor,
  MarketplaceAccess
} from './pages/Admin';
import { DonorsList } from './pages/Admin/Donor/DonorsList/DonorsList';
import { DonorRequest } from './pages/Admin/DonorRequest/DonorRequest';
import { OrganisationAdditional } from './pages/OrganisationAdditional/OrganisationAdditional';
import { EditOrganization } from './pages/Admin/EditOrganization/EditOrganization';
import { EditProject } from './pages/Admin/EditProject/EditProject';
import { useAppSelector } from './store';
import { selectorGetUser } from './store/Auth/selectors';
import { ROLES } from './config';
import OrganizationDocs from './pages/OrganizationDocs/OrganizationDocs';
import { AboutUsThemeProvider } from './context/AboutUsThemeContext';
import Manage from './pages/Manage/Manage';
import { Chart } from './Components/Chart/chart';

const getLibrary = (provider: any) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

const ProtectedRoute = ({ requiredRoles = [] }: { requiredRoles: string[] }) => {
  const user = useAppSelector(selectorGetUser);
  const role = user?.role || '';

  if (requiredRoles.includes(role)) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
};

function App() {
  return (
    <div className="App">
      <ConfigProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
          <AboutUsThemeProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<DefaultLayout />}>
                  {/* Public Routes */}
                  <Route path={appPaths.home.path} element={<Home />} />
                  <Route path={appPaths.chart.path} element={<Chart />} />
                  <Route path={appPaths.about.path} element={<About />} />
                  <Route path={appPaths.dueDiligenceForm.path} element={<DueDiligenceForm />} />
                  <Route path={appPaths.proposeProject.path} element={<ProposeProject />} />
                  <Route
                    path={appPaths.organisationAdditional.path}
                    element={<OrganisationAdditional />}
                  />

                  {/* Admin only */}
                  <Route element={<ProtectedRoute requiredRoles={[ROLES.ADMIN]} />}>
                    <Route path={appPaths.adminOrganisations.path} element={<Organisations />} />
                  </Route>

                  {/* Donor */}
                  <Route element={<ProtectedRoute requiredRoles={[ROLES.ADMIN, ROLES.DONOR]} />}>
                    <Route path={appPaths.projects.path} element={<Projects />} />
                    <Route path={appPaths.adminCreateDonor.path} element={<CreateDonor />} />
                    <Route path={appPaths.adminDonorsList.path} element={<DonorsList />} />
                    <Route path={appPaths.projectDetail.path} element={<ProjectDetail />} />
                    <Route
                      path={appPaths.organizationDetails.path}
                      element={<OrganizationDetail />}
                    />
                    <Route
                      path={appPaths.organisationAdditional.path}
                      element={<OrganisationAdditional />}
                    />
                  </Route>

                  {/* Org */}
                  <Route element={<ProtectedRoute requiredRoles={[ROLES.ADMIN, ROLES.ORG]} />}>
                    <Route path={appPaths.adminDonorsRequest.path} element={<DonorRequest />} />
                    <Route
                      path={appPaths.adminEditOrganization.path}
                      element={<EditOrganization />}
                    />
                    <Route path={appPaths.adminEditProject.path} element={<EditProject />} />
                    <Route
                      path={appPaths.organisationAdditional.path}
                      element={<OrganisationAdditional />}
                    />
                    <Route
                      path={appPaths.adminOrganisationsDetail.path}
                      element={<OrganisationDetail />}
                    />
                    <Route path={appPaths.adminProjects.path} element={<AdminProjects />} />
                    <Route
                      path={appPaths.adminProjectDetail.path}
                      element={<AdminProjectDetail />}
                    />
                    <Route path={appPaths.organisationDocs.path} element={<OrganizationDocs />} />
                  </Route>

                  <Route
                    element={
                      <ProtectedRoute requiredRoles={[ROLES.ADMIN, ROLES.ORG, ROLES.DONOR]} />
                    }>
                    <Route path={appPaths.marketplaceAccess.path} element={<MarketplaceAccess />} />
                  </Route>
                  <Route path={appPaths.manage.path} element={<Manage />} />
                </Route>
                <Route path="*" element={<GlobalNotFound />} />
              </Routes>
              <ThemeHandler />
            </BrowserRouter>
          </AboutUsThemeProvider>
        </Web3ReactProvider>
      </ConfigProvider>
    </div>
  );
}

export default App;
