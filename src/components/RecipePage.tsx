import React from 'react';
import { Clock, Users, ChefHat, ArrowLeft, ArrowRight, Lightbulb } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { recipeData, Recipe } from '../data/recipeData';

interface RecipePageProps {
  recipeId: string;
  onBack: () => void;
}

const RecipePage: React.FC<RecipePageProps> = ({ recipeId, onBack }) => {
  const { language, t } = useLanguage();
  
  const recipe = recipeData.find(r => r.id === recipeId);
  
  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {language === 'ar' ? 'الوصفة غير موجودة' : 'Recipe not found'}
          </h1>
          <button
            onClick={onBack}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            {language === 'ar' ? 'العودة للمنيو' : 'Back to Menu'}
          </button>
        </div>
      </div>
    );
  }

  const BackIcon = language === 'ar' ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 rtl:space-x-reverse text-orange-600 hover:text-orange-700 mb-6 font-semibold transition-colors"
        >
          <BackIcon className="h-5 w-5" />
          <span>{language === 'ar' ? 'العودة للمنيو' : 'Back to Menu'}</span>
        </button>

        {/* Recipe Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={recipe.image}
                alt={recipe.name[language]}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-amiri">
                {recipe.name[language]}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {recipe.description[language]}
              </p>
              
              {/* Recipe Info */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <Clock className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-800">
                    {language === 'ar' ? 'وقت التحضير' : 'Prep Time'}
                  </p>
                  <p className="text-orange-600 font-bold">{recipe.prepTime[language]}</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <Users className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-800">
                    {language === 'ar' ? 'عدد الأشخاص' : 'Servings'}
                  </p>
                  <p className="text-orange-600 font-bold">{recipe.servings[language]}</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <ChefHat className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-800">
                    {language === 'ar' ? 'الصعوبة' : 'Difficulty'}
                  </p>
                  <p className="text-orange-600 font-bold">{recipe.difficulty[language]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-amiri">
              {language === 'ar' ? 'المكونات' : 'Ingredients'}
            </h2>
            <ul className="space-y-3">
              {recipe.ingredients[language].map((ingredient, index) => (
                <li key={index} className="flex items-start space-x-3 rtl:space-x-reverse">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 leading-relaxed">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-amiri">
              {language === 'ar' ? 'طريقة التحضير' : 'Instructions'}
            </h2>
            <ol className="space-y-4">
              {recipe.instructions[language].map((instruction, index) => (
                <li key={index} className="flex items-start space-x-3 rtl:space-x-reverse">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 leading-relaxed pt-1">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Tips */}
        {recipe.tips[language].length > 0 && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl shadow-lg p-6 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-amiri flex items-center space-x-2 rtl:space-x-reverse">
              <Lightbulb className="h-6 w-6 text-orange-600" />
              <span>{language === 'ar' ? 'نصائح مهمة' : 'Important Tips'}</span>
            </h2>
            <ul className="space-y-3">
              {recipe.tips[language].map((tip, index) => (
                <li key={index} className="flex items-start space-x-3 rtl:space-x-reverse">
                  <span className="flex-shrink-0 w-2 h-2 bg-orange-600 rounded-full mt-2"></span>
                  <span className="text-gray-700 leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipePage;