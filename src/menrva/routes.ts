const Routes = {
  // pages
  Login: {
    title: 'Login',
    icon: 'login',
    path: '/',
    roles: ['staff', 'doctor'],
  },
  Home: { title: 'Home', icon: 'home', path: '/', roles: ['doctor'] },

  // records
  Records: {
    Entry: {
      title: 'Entry',
      icon: 'user_add',
      path: '/records/entry',
      roles: ['doctor'],
    },
    Search: {
      title: 'Records',
      icon: 'user',
      path: '/records/search',
      roles: ['doctor'],
    },
  },
  // opd
  Vitals: {
    title: 'Vitals',
    icon: 'chart_add',
    path: '/opd/vitals',
    roles: ['doctor'],
  },

  // consultaion
  Consultation: {
    title: 'Consultation',
    icon: 'chat_alt',
    path: '/consultation/patients',
    roles: ['doctor'],
  },

  // ward
  Ward: {
    title: 'Ward',
    icon: 'person',
    path: '/ward/patients',
    roles: ['doctor'],
  },

  // maternal
  Maternal: {
    title: 'Maternal',
    icon: 'heart',
    path: '/maternal/patients',
    roles: ['doctor'],
  },

  // pharmacy
  Pharmacy: {
    title: 'Pharmacy',
    icon: 'table_add',
    path: '/pharmacy/patients',
    roles: ['doctor'],
  },

  // finance
  Finance: {
    title: 'Finance',
    icon: 'note',
    path: '/finance/patients',
    roles: ['doctor'],
  },

  // laboratory
  Laboratory: {
    title: 'Laboratory',
    icon: 'opacity',
    path: '/laboratory/patients',
    roles: ['doctor'],
  },
};

export default Routes;
