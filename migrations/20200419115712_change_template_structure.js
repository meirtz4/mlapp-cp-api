
exports.up = function(knex) {
    return new Promise((resolve, reject) => {           

        knex.schema
        .alterTable('templates', (table) => {
            table.json('pipeline_templates').defaultTo('{}');            
        }).then(function(){ 
            
            knex('templates')
                .where('name', 'basic_regression')
                .update({
                    pipeline_templates: JSON.stringify(
                        {
                            train : {"pipelines_configs": [{"data_settings": {"local_file_path": "data/diabetes.csv", "variable_to_predict": "target", "data_handling": {"features_for_train": [], "set_features_index": [], "features_to_remove": ["sex"], "feature_remove_by_null_percentage": 0.3}}, "model_settings": {"train_percent": 0.8, "variable_to_predict": "target", "sklearn_linear_models": ["Lasso", "Ridge"], "model_output_keys": {"metadata": ["scores", "selected_features_names", "model_type_name", "intercept", "coefficients"]}}, "job_settings": {"asset_name": "basic_regression", "pipeline": "train"}}] },
                            forecast: {"pipelines_configs": [{"data_settings": {}, "model_settings": {}, "job_settings": {"asset_name": "basic_regression", "pipeline": "train"} }] }
                        }
                    )
                }).then(function(){ resolve()}); 
    
                knex('templates')
                .where('name', 'advanced_regression')
                .update({
                    pipeline_templates: JSON.stringify(
                        {
                            train : {"pipelines_configs": [{"job_settings": {"pipeline": "train", "asset_name": "advanced_regression"}, "data_settings": {"data_sources": {"db": {"args": [], "query": "SELECT * FROM diabetes"}, "local": {"file_paths": ["data/diabetes.csv"]}}, "data_handling": {"interactions": true, "features_to_bin": [{"bins": [-0.05, 0.03], "name": "tch"}, {"bins": [0.07], "name": "hdl"}], "features_handling": {"bmi": {"fillna": "np.mean", "transformation": ["np.square"]}, "glu": {"fillna": "np.mean", "transformation": ["np.square"]}, "hdl": {"fillna": "np.mean", "transformation": ["np.square"]}, "tch": {"fillna": "np.mean", "transformation": ["np.square"]}}, "features_for_train": [], "features_to_remove": ["age", "sex", "tc", "ldl", "age_sex", "sex_age", "age_hdl", "hdl_age", "sex_tc", "tc_sex", "sex_ldl", "ldl_sex", "bmi_hdl", "hdl_bmi", "map_hdl", "hdl_map", "tc_hdl", "hdl_tc", "hdl_tch", "tch_hdl", "hdl_ltg", "ltg_hdl", "hdl_glu", "glu_hdl"], "set_features_index": [], "feature_remove_by_null_percentage": 0.3}, "data_output_keys": {"results": ["missing_values"], "images_files": []}}, "model_settings": {"train_percent": 0.8, "modeling_methods": {"Tree": {"models": ["RandomForest"], "scoring": "mean_squared_error", "function": "non_linear_models", "y_column": "y", "search_type": "randomized", "fixed_params": {"XGBoost": {}, "ExtraTree": {}, "RandomForest": {"n_estimators": 400}}, "hyper_params": {"XGBoost": {"max_depth": [3, 5, 8], "n_estimators": [200, 500], "learning_rate": [0.01]}, "ExtraTree": {"max_depth": [3, 5, 8], "n_estimators": [50]}, "RandomForest": {"max_depth": [3, 5, 7], "n_estimators": [200, 500]}}, "test_score_name": "Testing MAPE", "low_score_is_better": true, "visualization_methods": {"hyper_params_evolution": "score_evolution_hyperparams"}, "model_accuracy_summary": "get_model_accuracy_for_regression"}, "Linear": {"models": ["Lasso", "Ridge"], "scoring": "mean_squared_error", "function": "linear_models", "y_column": "y", "search_type": "randomized", "hyper_params": {"Lars": {"normalize": [false], "n_nonzero_coefs": [10]}, "Lasso": {"alpha": [-10, -9.591836734693878, -9.183673469387756, -8.775510204081632, -8.36734693877551, -7.959183673469388, -7.551020408163265, -7.142857142857142, -6.73469387755102, -6.326530612244898, -5.918367346938775, -5.5102040816326525, -5.1020408163265305, -4.6938775510204085, -4.285714285714286, -3.8775510204081622, -3.4693877551020407, -3.0612244897959187, -2.653061224489796, -2.244897959183673, -1.8367346938775508, -1.4285714285714288, -1.020408163265305, -0.612244897959183, -0.204081632653061, 0.204081632653061, 0.612244897959183, 1.0204081632653068, 1.4285714285714288, 1.8367346938775508, 2.244897959183674, 2.6530612244897966, 3.0612244897959187, 3.4693877551020407, 3.8775510204081622, 4.2857142857142865, 4.6938775510204085, 5.1020408163265305, 5.510204081632654, 5.918367346938776, 6.326530612244898, 6.73469387755102, 7.142857142857142, 7.551020408163264, 7.95918367346939, 8.367346938775512, 8.775510204081634, 9.183673469387756, 9.591836734693878, 10]}, "Ridge": {"alpha": [-1, -0.9591836734693876, -0.9183673469387756, -0.8775510204081632, -0.8367346938775511, -0.7959183673469388, -0.7551020408163265, -0.7142857142857143, -0.6734693877551021, -0.6326530612244898, -0.5918367346938775, -0.5510204081632654, -0.5102040816326531, -0.4693877551020409, -0.4285714285714286, -0.3877551020408164, -0.34693877551020413, -0.30612244897959184, -0.26530612244897966, -0.22448979591836735, -0.1836734693877552, -0.1428571428571429, -0.10204081632653073, -0.061224489795918435, -0.020408163265306145, 0.020408163265306145, 0.06122448979591821, 0.1020408163265305, 0.1428571428571428, 0.18367346938775508, 0.22448979591836715, 0.26530612244897944, 0.30612244897959173, 0.346938775510204, 0.3877551020408163, 0.4285714285714284, 0.4693877551020406, 0.510204081632653, 0.5510204081632653, 0.5918367346938773, 0.6326530612244896, 0.6734693877551019, 0.7142857142857142, 0.7551020408163265, 0.7959183673469385, 0.8367346938775508, 0.8775510204081631, 0.9183673469387754, 0.9591836734693876, 1]}, "LassoLars": {"alpha": [0.0000000001, 0.00000000025595479226995335, 0.0000000006551285568595494, 0.0000000016768329368110102, 0.000000004291934260128778, 0.000000010985411419875573, 0.000000028117686979742307, 0.00000007196856730011529, 0.00000018420699693267165, 0.000000471486636345739, 0.0000012067926406393288, 0.000003088843596477485, 0.000007906043210907702, 0.000020235896477251556, 0.000051794746792312125, 0.0001325711365590111, 0.000339322177189533, 0.000868511373751352, 0.0022229964825261957, 0.005689866029018305, 0.014563484775012445, 0.03727593720314938, 0.09540954763499963, 0.2442053094548655, 0.6250551925273976, 1.5998587196060574, 4.094915062380419, 10.481131341546874, 26.826957952797272, 68.66488450042998, 175.75106248547965, 449.8432668969453, 1151.395399326448, 2947.0517025518097, 7543.120063354608, 19306.977288832535, 49417.13361323838, 126485.52168552956, 323745.7542817653, 828642.7728546859, 2120950.8879201924, 5428675.439323859, 13894954.94373136, 35564803.06223121, 91029817.79915264, 232995181.05153817, 596362331.6594661, 1526417967.1752365, 3906939937.0546207, 10000000000], "normalize": [false]}, "ElasticNet": {"alpha": [0.1, 0.20691380811147897, 0.42813323987193935, 0.8858667904100825, 1.8329807108324356, 3.79269019073225, 7.847599703514611, 16.23776739188721, 33.59818286283781, 69.51927961775606, 143.8449888287663, 297.6351441631316, 615.8482110660261, 1274.2749857031322, 2636.6508987303555, 5455.594781168515, 11288.378916846885, 23357.21469090121, 48329.30238571752, 100000], "l1_ratio": [0.01, 0.03162277660168379, 0.1, 0.31622776601683794, 1]}, "BayesianRidge": {"alpha_1": [-10, -5, 0, 5, 10], "alpha_2": [-10, -5, 0, 5, 10], "lambda_1": [-10, -5, 0, 5, 10], "lambda_2": [-10, -5, 0, 5, 10]}, "LinearRegression": {}}, "test_score_name": "Testing MAPE", "low_score_is_better": true, "visualization_methods": {"hyper_params_evolution": "score_evolution_hyperparams"}, "model_accuracy_summary": "get_model_accuracy_for_regression"}}, "model_output_keys": {"metadata": ["scores", "model_w_best_feature_selection_name", "selected_features_names", "model_type_name", "intercept", "coefficients", "selected_test_method_name"], "images_files": []}, "variable_to_predict": "target", "feature_selection_methods": {"RFE": {"params": {"prop": 0.5}, "function": "select_features_with_RFE"}, "AllFeatures": {"params": {}, "function": "lambda X, y, params: X"}, "SelectBestKModel": {"params": {"k": 0.8, "is_regression": true}, "function": "select_k_best"}, "SelectBestTransformation": {"params": {"max_correlation": 2, "original_feature_names": []}, "function": "select_best_transformation"}}, "selected_modeling_methods": ["Tree", "Linear"], "selected_feature_selection_methods": ["AllFeatures", "SelectBestKModel", "RFE"]}}]},
                            forecast: {"pipelines_configs": [{"data_settings": {}, "model_settings": {}, "job_settings": {"asset_name": "advanced_regression", "pipeline": "forecast"} }] }
                        }
                    )
                }).then(function(){ resolve()}); 
    
                knex('templates')
                .where('name', 'classification')
                .update({
                    pipeline_templates: JSON.stringify(
                        {
                            train : {"pipelines_configs": [{"job_settings": {"pipeline": "train", "asset_name": "classification"}, "data_settings": {"model_name": "breast_cancer", "data_handling": {"y_variable": {"type": "binary", "label_to_predict": ["POSITIVE"], "categories_labels": ["NEGATIVE", "POSITIVE"], "continuous_to_category_bins": [-1, 1, 2]}, "dates_format": ["%d/%m/%Y", "%Y-%m-%d"], "features_to_bin": [{"bins": [12.3, 15.3], "name": "mean radius"}, {"bins": [15, 23], "name": "mean texture"}, {"bins": [72, 109], "name": "mean perimeter"}, {"bins": [361, 886], "name": "mean area"}, {"bins": [0.074, 0.11], "name": "mean smoothness"}, {"bins": [0.047, 0.137, 0.228], "name": "mean compactness"}, {"bins": [0.023, 0.12], "name": "mean concavity"}, {"bins": [0.025], "name": "mean concave points"}, {"bins": [0.142, 0.2, 0.26], "name": "mean symmetry"}, {"bins": [0.0518, 0.0541, 0.0742, 0.0827], "name": "mean fractal dimension"}, {"bins": [0.19, 0.56, 0.83], "name": "radius error"}, {"bins": [500, 1050], "name": "worst area"}, {"bins": [85, 120], "name": "worst perimeter"}, {"bins": [16.6, 42], "name": "worst texture"}, {"bins": [12.5, 18], "name": "worst radius"}, {"bins": [0.006, 0.0135], "name": "fractal dimension error"}, {"bins": [0.011, 0.082, 0.15], "name": "concavity error"}, {"bins": [1.3, 5], "name": "perimeter error"}], "features_handling": {"mean radius": {"fillna": "np.mean", "transformation": ["np.square", "np.sqrt"]}, "radius error": {"fillna": 0, "transformation": []}}, "evaluator_settings": {"store_evaluator_features": true, "filter_evaluator_threshold": 0.05}, "features_for_train": null, "features_to_remove": ["texture error", "area error", "smoothness error", "compactness error", "concave points error", "symmetry error", "worst smoothness", "worst compactness", "worst concavity", "worst concave points", "worst symmetry", "worst fractal dimension"], "set_features_index": null, "features_for_filter": {}, "dates_transformation": {"columns": [], "extraction_date": "20180430"}, "default_missing_value": 0, "features_interactions": [], "action_for_continuous_features": "auto_bin", "feature_remove_by_null_percentage": 0.3}, "local_data_csvs": [{"name": "breast_cancer", "path": "data/breast_cancer.csv"}], "data_output_keys": {"results": ["missing_values", "evaluator_features_mappings"], "images_files": []}}, "model_settings": {"scale": false, "train_percent": 0.8, "modeling_methods": {"Binary classification": {"models": ["XGBoostClassifier", "Logistic", "ExtraTreeClassifier"], "scoring": "f1_score", "function": "classification_models", "y_column": "y", "search_type": "randomized", "fixed_params": {"RBF SVM": {"kernel": "rbf", "probability": true}, "Logistic": {"solver": "liblinear", "max_iter": 500}, "RandomForest": {}, "XGBoostClassifier": {}, "ExtraTreeClassifier": {"max_depth": 10, "class_weight": "balanced", "min_samples_leaf": 4}}, "hyper_params": {"RBF SVM": {"gamma": ["auto", 0.5, 2, 4]}, "Logistic": {"C": [0.01, 0.29500000000000004, 0.5800000000000001, 0.8650000000000001, 1.15, 1.4350000000000005, 1.7200000000000002, 2.005, 2.29, 2.575, 2.8600000000000003, 3.145, 3.43, 3.715, 4], "penalty": ["l1", "l2"], "class_weight": ["balanced", null], "fit_intercept": [true]}, "RandomForest": {"max_depth": [5, 7, 10], "n_estimators": [400, 700, 1000]}, "XGBoostClassifier": {"max_depth": [3, 7, 10], "n_estimators": [300, 500, 700], "learning_rate": [0.001, 0.0105, 0.02], "min_child_weight": [3, 10]}, "ExtraTreeClassifier": {"n_estimators": [10, 50, 200], "min_samples_split": [2, 10]}}, "test_score_name": "F_Beta Training Accuracy", "low_score_is_better": false, "visualization_methods": {"calibration": "plot_calibration_curve", "classification_results": "plot_multiple_confusion_matrix", "hyper_params_evolution": "score_evolution_hyperparams"}, "model_accuracy_summary": "get_model_accuracy_for_classification", "predict_proba_treshold": [0.47, 0.48, 0.49, 0.5, 0.51, 0.52]}, "Multilabel classification": {"models": ["MultiLogistic", "ExtraTreeClassifier", "KnearestNeighbors", "RandomForest", "XGBoostClassifier"], "scoring": "classifier_scoring", "function": "classification_models", "y_column": "y", "search_type": "randomized", "test_score_name": "F_Beta Training Accuracy", "low_score_is_better": false, "visualization_methods": {"classification_results": "plot_multiple_confusion_matrix", "hyper_params_evolution": "score_evolution_hyperparams"}, "model_accuracy_summary": "get_model_accuracy_for_classification"}}, "model_output_keys": {"metadata": ["model_name", "scores", "probability_threshold_accuracies", "model_w_best_feature_selection_name", "selected_features_names", "model_type_name", "intercept", "coefficients", "model_params"], "models_objects": ["final_model", "all_trained_models"]}, "down_sample_method": {"flag": true, "seed": 1500, "n_samples": 100}, "variable_to_predict": "answer", "split_train_test_method": "split_train_test_stratified", "feature_selection_methods": {"RFE": {"params": {"prop": 0.5}, "function": "select_features_with_RFE"}, "AllFeatures": {"params": {}, "function": "lambda X, y, params: X"}, "SelectBestKModel": {"params": {"k": 0.5, "is_regression": true}, "function": "select_k_best"}, "SelectBestTransformation": {"params": {"max_correlation": 2, "original_feature_names": []}, "function": "select_best_transformation"}}, "selected_modeling_methods": ["Binary classification"], "selected_feature_selection_methods": ["AllFeatures", "SelectBestKModel", "RFE"]}}]},
                            forecast: {"pipelines_configs": [{"data_settings": {}, "model_settings": {}, "job_settings": {"asset_name": "classification", "pipeline": "forecast"} }] }
                        }
                    )
                }).then(function(){ resolve()}); 
                       
        });

    })
};

exports.down = function(knex) {
    return new Promise((resolve, reject) => {      
        
        knex.schema
        .alterTable('templates', (table) => {
            table.dropColumn('pipeline_templates');
        }).then(function(){ resolve()});

    }); 
};