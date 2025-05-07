import React, { useState } from 'react';

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: string[];
}

interface Props {
  params: Param[];
  model: Model;
}
const params: Param[] = [
  { id: 1, name: 'Название', type: 'string' },
  { id: 2, name: 'Описание', type: 'string' },
];

const model: Model = {
  paramValues: [
    { paramId: 1, value: 'Товар 1' },
    { paramId: 2, value: 'Описание товара 1' },
  ],
  colors: ['Красный', 'Синий']
};

const ModelEditor: React.FC<Props> = () => {
  const [paramValues, setParamValues] = useState<Map<number, string>>( new Map(model.paramValues.map((paramValue) => [paramValue.paramId, paramValue.value])) );

  const handleParamChange = (paramId: number, value: string) => { setParamValues((prev) => new Map(prev).set(paramId, value)); };

  const getModel = (): Model => {
    const updatedParamValues = Array.from(paramValues).map(([paramId, value]) => ({
      paramId,
      value
    }));
    return {
      paramValues: updatedParamValues,
      colors: model.colors 
    };
  };

  return (
    <div>
      <h2>Редактор модели</h2>
      <form>
        {params.map((param) => {
          return (
            <div key={param.id} style={{ marginBottom: '10px' }}>
              <label htmlFor={`param-${param.id}`}>{param.name}:</label>
              <input
                type="text"
                id={`param-${param.id}`}
                value={paramValues.get(param.id) || ''}
                onChange={(e) => handleParamChange(param.id, e.target.value)}
                style={{ marginLeft: '10px' }}
              />
            </div>
          );
        })}
      </form>
      <button onClick={() => console.log(getModel())}>Получить модель</button>
    </div>
  );
};

export default ModelEditor;
