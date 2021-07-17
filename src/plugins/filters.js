import Vue from 'vue';
import moment from 'moment'

Vue.filter('formatDate', function(value) {
    if (value) {
      return moment(String(value)).format('DD/MM/YYYY HH:mm')
    }
  }
);

Vue.filter('formatReal', function(value) {
    if (value) {
      return  'R$ '+ `${value}`.replace(/\./,',');
    }
  }
);

Vue.filter('formatCodigo', function(value) {
  if (value) {
      for(let i = value.toString().length; i <= 6; i++ ) value = `0${value}`;
    return  value;
  }
}
);