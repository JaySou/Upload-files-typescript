import React from 'react';
import { SwitchWrapper, RouteWrapper } from './common/components/Router';

/** Pages Components */
import Upload from './pages/Upload';
import History from './pages/History';
import FileData from './pages/FileData';

export default function Routes() {
  return (
    <SwitchWrapper>
      <RouteWrapper exact path='/' component={Upload} />
      <RouteWrapper path='/upload' component={Upload} />
      <RouteWrapper path='/history' component={History} />
      <RouteWrapper path='/file-data' component={FileData} />
    </SwitchWrapper>
  );
}