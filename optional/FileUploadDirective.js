/**
 * Created by nmamikon on 9/7/2015.
 */
'use strict';
(function (serviceCamp) {
  serviceCamp.directive('scFileUpload', ['$timeout', 'HelperService', '$rootScope', 'insights',
    function ($timeout, HelperService, $rootScope, insights) {
      return {
        restrict: 'EA',
        scope: {
          multiple: '@',
          callbackFn: '&',
          modelToBind: '=',
          isDisabled: '=',
          position: '@',
          accept: '@',
          label: '@',
          limit: '='
        },
        replace: false,
        templateUrl: '/src/app/main/views/file-upload.html',
        controller: ['$scope', function ($scope) {


        }],
        link: function ($scope, $element) {
          $scope.errors = [];
          $scope.positionStyle = {};
          var SIZE_LIMIT = $scope.limit || 20; // 20mb
          var sizeLimitBytes = SIZE_LIMIT * 1024 * 1024; // 1mb = 1.000.000
          var inputFile = $element.find('input')[0],
            filesArray,
            readyFilesArray = [];
          $scope.readyFiles = [];
          inputFile.onchange = handleSelection;


          if ($scope.multiple) {
            inputFile.setAttribute('multiple', true);
          }
          if ($scope.accept) {
            inputFile.setAttribute('accept', $scope.accept);
          }

          $scope.labelText = ($scope.label) ? $scope.label : '';

          var uploadElement = $element[0].getElementsByClassName('upload-element')[0];
			if(uploadElement && uploadElement.addEventListener) {
			  uploadElement.addEventListener('click', function (e) {
				if ($scope.isDisabled || !e.clientX) {  return; }

				inputFile.value = null;
				inputFile.click();
				insights.logEvent('Add Files');
			  });
			}
          $scope.$watchCollection('modelToBind', function (n, o) {
            if (angular.isArray(n) && n.length == 0) {
              $scope.readyFiles.length = 0;
            }
          });

          $scope.renderFiles = function (files) {
            $scope.readyFiles = files;
            $scope.modelToBind = $scope.readyFiles;
            $scope.$apply();
          };

          $scope.removeFile = function (index) {
            if (index > -1) {
              $scope.readyFiles.splice(index, 1);
            }

          };

          function filePicked(file) {
            if (fileIsValid(file)) {
              var fileReader = new FileReader();
              fileReader.onloadend = function (e) {
                fileLoaded(e, file);
              };
              fileReader.readAsDataURL(file);
            }

          }

          var $fileListContainer = $($element).find('.file-list');

          $scope.positionFileList = function () {
            if ($scope.position) {
              $timeout(function () {
                var newHeight = $($element).parent().find('.reply-attachment').height() + $fileListContainer.height() + 7;
                $element.parent().height(newHeight);
              }, 50);
            }
          };

          $scope.$watch('errors', $scope.positionFileList);

          $scope.$watchCollection('readyFiles', $scope.positionFileList);

          function getFileSizeSum(filesList) {
            var fileSizeSum = 0;

            filesList.forEach(function (file) {
              fileSizeSum = fileSizeSum + file.size;
            });
            return fileSizeSum;
          }


          function fileIsValid(file) {
            var validation = true;
			var sizeMsg = $rootScope.translate("Your files couldn't be uploaded. Files should be less than s% MB.", [SIZE_LIMIT]);
            var currentFileSum = getFileSizeSum($scope.readyFiles) + file.size;
            var curFileStackSize = getFileSizeSum(filesArray);
            if (file.size > sizeLimitBytes || currentFileSum > sizeLimitBytes || curFileStackSize > sizeLimitBytes) {
              addErrorMessage(sizeMsg);
              validation = false;
            }
            if ($scope.accept) {
              var acceptedExts = $scope.accept.split(',');
              if (acceptedExts.length > 0) {
                var fiel_name_arr = file.name.split('.');
                var file_ext = '.' + fiel_name_arr[fiel_name_arr.length - 1];
                if (!in_array(acceptedExts, file_ext)) {
                  addErrorMessage(uploaded_file_ext_error(acceptedExts));
                  validation = false;
                }
              }
            }


            return validation;

          }

          function addErrorMessage(mes) {
            if (!HelperService.arrValueExist($scope.errors, mes)) {
              $scope.errors.push(mes);

              $timeout(function () {
                $scope.errors = [];
              }, 15000);

              $scope.$digest();
            }
          }

          function in_array(a, obj) {
            for (var i = 0; i < a.length; i++) {
              if (a[i].toUpperCase() === obj.toUpperCase()) {
                return true;
              }
            }
            return false;
          }

          function uploaded_file_ext_error(acceptedExts) {
            var str = '';
            for (var i = 0; i < acceptedExts.length; i++) {
              str += acceptedExts[i].replace('.', '').toUpperCase() + ', ';
            }
            str = str.substring(0, str.length - 2);
            return   $rootScope.translate("Your files couldn't be uploaded. Files should be saved as s% files.", [str] );
          }

          function handleSelection() {
            var files = inputFile.files;
            $scope.errors = [];
            $scope.$digest();
            if ($scope.multiple) {
              filesArray = Array.prototype.slice.call(files);
              filesArray.forEach(function (file) {
                filePicked(file);
              });
            } else {
              filePicked(files[0]);
            }

          }

          function handleUpload(files) {
            console.log('uploading file... ', files);
            $scope.renderFiles(files);
          }


          function fileLoaded(e, file) {
            var data = e.target.result;
            readyFilesArray.push({data: data, name: file.name, type: file.type, size: file.size});
            handleUpload(readyFilesArray);

            if($scope.callbackFn) {
              $scope.callbackFn();
            }
          }

        }
      };
    }
  ]);
})(serviceCamp);


