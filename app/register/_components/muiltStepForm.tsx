const MultiStepForm = ({ step = 1 }) => {
    const totalSteps = 4;
  
    return (
      <div className="max-w-lg mx-auto p-4">
        <div className="mb-4">
          <h2 className="text-xs font-semibold text-gray200">{`Passo ${step} de ${totalSteps}`}</h2>
        </div>
  
        {/* Barra de Progresso Horizontal */}
        <div className="flex gap-2 w-full h-1.5 rounded-full">
          {[1, 2, 3, 4].map((stepNum) => (
            <div
              key={stepNum}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                stepNum <= step ? 'bg-gray100' : 'bg-gray600'
              }`}
              style={{
                width: `${100 / totalSteps}%`, // Cada barra ocupa uma fração igual
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  };
  
  export default MultiStepForm;
  