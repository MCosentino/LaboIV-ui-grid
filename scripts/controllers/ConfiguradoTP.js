angular
  .module('app')
  .controller('ConfiguradoTPCtrl', function($scope, data, i18nService, uiGridConstants) {
    $scope.titulo = "Configuracion Campos";
    // Objeto de configuracion de la grilla.
    $scope.gridOptions = {};
    $scope.gridOptions.paginationPageSizes = [25, 50, 75];
    // Configuracion de la paginacion
    $scope.gridOptions.paginationPageSize = 25;
    $scope.gridOptions.columnDefs = columnDefs();
    // Activo la busqueda en todos los campos.
    $scope.gridOptions.enableFiltering = true;
    // Configuracion del idioma.
    i18nService.setCurrentLang('es');

    data.data().then(function(rta){
      // Cargo los datos en la grilla.
      console.log(rta);
      $scope.gridOptions.data = rta;
    });

    console.log(uiGridConstants);

    function columnDefs () {
      return [
        { field: 'id', name: '#', width: 45},
        { field: 'avatar', name: 'avatar',cellTemplate:"<img width=\"20px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"},
        { field: 'foto', name: 'foto',cellTemplate:"<img width=\"20px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"},
        { field: 'nombre', name: 'nombre'
          ,enableFiltering: false
        },
        { field: 'apellido', name: 'apellido'},
        { field: 'email', name: 'mail'},
        { field: 'sexo', name: 'sexo'
        // filtro de busqueda.
          ,filter: {
            // term: '1',
            type: uiGridConstants.filter.STARTS_WITH,
            selectOptions: [
              {value: 'Male', label: 'Masculino'},
              {value: 'Female', label: 'Femenino'}
            ]
          }
          //filtro de los datos
          ,cellFilter: 'sexoTP'
        },
        { field: 'fechaNacimiento', name: 'fechaNacimiento'
          ,type: 'date'
          ,cellFilter: "date: 'dd-MM-yyyy'"
        }
      ];
    }
  })
