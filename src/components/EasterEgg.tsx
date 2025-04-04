import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Coffee, Gamepad2, Gift, PartyPopper } from 'lucide-react';

interface EasterEggProps {
  onBack: () => void;
  coffeeCount: number;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE_LENGTH = 3;
const GAME_SPEED = 120;
const COFFEE_BEANS_TO_WIN = 10;
const OBSTACLE_COUNT = 5;

export const EasterEgg: React.FC<EasterEggProps> = ({ onBack, coffeeCount }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [score, setScore] = useState(0);
  const [snake, setSnake] = useState<Position[]>([]);
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [food, setFood] = useState<Position>({ x: 0, y: 0 });
  const [obstacles, setObstacles] = useState<Position[]>([]);
  const [nextDirection, setNextDirection] = useState<Direction>('RIGHT');
  const [showReward, setShowReward] = useState(false);
  const gameLoopRef = useRef<number>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const initializeGame = () => {
    const initialSnake = [];
    const startX = Math.floor(GRID_SIZE / 4);
    const startY = Math.floor(GRID_SIZE / 2);
    
    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
      initialSnake.push({ x: startX - i, y: startY });
    }

    const newObstacles = [];
    const safeZone = 5;
    
    while (newObstacles.length < OBSTACLE_COUNT) {
      const obstacle = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      
      const isFarFromStart = Math.abs(obstacle.x - startX) > safeZone || 
                            Math.abs(obstacle.y - startY) > safeZone;
      
      if (isFarFromStart && !newObstacles.some(o => o.x === obstacle.x && o.y === obstacle.y)) {
        newObstacles.push(obstacle);
      }
    }

    setSnake(initialSnake);
    setDirection('RIGHT');
    setNextDirection('RIGHT');
    setScore(0);
    setGameOver(false);
    setObstacles(newObstacles);
    spawnFood(initialSnake, newObstacles);
  };

  const spawnFood = (currentSnake: Position[], currentObstacles: Position[]) => {
    let newFood: Position;
    let attempts = 0;
    const maxAttempts = 100;

    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      attempts++;

      if (attempts >= maxAttempts) {
        for (let x = 0; x < GRID_SIZE; x++) {
          for (let y = 0; y < GRID_SIZE; y++) {
            const pos = { x, y };
            if (!currentSnake.some(s => s.x === x && s.y === y) &&
                !currentObstacles.some(o => o.x === x && o.y === y)) {
              newFood = pos;
              break;
            }
          }
        }
        break;
      }
    } while (
      currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y) ||
      currentObstacles.some(obstacle => obstacle.x === newFood.x && obstacle.y === newFood.y)
    );
    
    setFood(newFood);
  };

  const moveSnake = useCallback(() => {
    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };
      
      setDirection(nextDirection);

      switch (nextDirection) {
        case 'UP':
          head.y = (head.y - 1 + GRID_SIZE) % GRID_SIZE;
          break;
        case 'DOWN':
          head.y = (head.y + 1) % GRID_SIZE;
          break;
        case 'LEFT':
          head.x = (head.x - 1 + GRID_SIZE) % GRID_SIZE;
          break;
        case 'RIGHT':
          head.x = (head.x + 1) % GRID_SIZE;
          break;
      }

      if (
        newSnake.some(segment => segment.x === head.x && segment.y === head.y) ||
        obstacles.some(obstacle => obstacle.x === head.x && obstacle.y === head.y)
      ) {
        setGameOver(true);
        return prevSnake;
      }

      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        setScore(prev => {
          const newScore = prev + 1;
          if (newScore >= COFFEE_BEANS_TO_WIN) {
            setGameWon(true);
            setShowReward(true);
            if (gameLoopRef.current) {
              clearInterval(gameLoopRef.current);
            }
          }
          return newScore;
        });
        spawnFood(newSnake, obstacles);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [nextDirection, food, obstacles]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted) return;

      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowUp':
          setNextDirection(prev => prev !== 'DOWN' ? 'UP' : prev);
          break;
        case 'ArrowDown':
          setNextDirection(prev => prev !== 'UP' ? 'DOWN' : prev);
          break;
        case 'ArrowLeft':
          setNextDirection(prev => prev !== 'RIGHT' ? 'LEFT' : prev);
          break;
        case 'ArrowRight':
          setNextDirection(prev => prev !== 'LEFT' ? 'RIGHT' : prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted]);

  useEffect(() => {
    if (!gameStarted || gameOver) {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
      return;
    }

    gameLoopRef.current = window.setInterval(moveSnake, GAME_SPEED);
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameStarted, gameOver, moveSnake]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#000000');
    gradient.addColorStop(1, '#1a1a1a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE);

    snake.forEach((segment, index) => {
      const x = segment.x * CELL_SIZE;
      const y = segment.y * CELL_SIZE;
      const size = CELL_SIZE - 1;
      const radius = 4;

      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + size - radius, y);
      ctx.quadraticCurveTo(x + size, y, x + size, y + radius);
      ctx.lineTo(x + size, y + size - radius);
      ctx.quadraticCurveTo(x + size, y + size, x + size - radius, y + size);
      ctx.lineTo(x + radius, y + size);
      ctx.quadraticCurveTo(x, y + size, x, y + size - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();

      const snakeGradient = ctx.createLinearGradient(x, y, x + size, y + size);
      if (index === 0) {
        snakeGradient.addColorStop(0, '#22c55e');
        snakeGradient.addColorStop(1, '#16a34a');
      } else {
        snakeGradient.addColorStop(0, '#4ade80');
        snakeGradient.addColorStop(1, '#22c55e');
      }
      
      ctx.fillStyle = snakeGradient;
      ctx.fill();
    });

    const beanGradient = ctx.createRadialGradient(
      food.x * CELL_SIZE + CELL_SIZE/2,
      food.y * CELL_SIZE + CELL_SIZE/2,
      0,
      food.x * CELL_SIZE + CELL_SIZE/2,
      food.y * CELL_SIZE + CELL_SIZE/2,
      CELL_SIZE/2
    );
    beanGradient.addColorStop(0, '#d97706');
    beanGradient.addColorStop(1, '#92400e');
    
    ctx.beginPath();
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE/2,
      food.y * CELL_SIZE + CELL_SIZE/2,
      CELL_SIZE/2 - 1,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = beanGradient;
    ctx.fill();

    obstacles.forEach(obstacle => {
      const x = obstacle.x * CELL_SIZE;
      const y = obstacle.y * CELL_SIZE;
      const size = CELL_SIZE - 1;

      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      const obstacleGradient = ctx.createLinearGradient(x, y, x + size, y + size);
      obstacleGradient.addColorStop(0, '#ef4444');
      obstacleGradient.addColorStop(1, '#dc2626');

      ctx.fillStyle = obstacleGradient;
      ctx.fillRect(x, y, size, size);

      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
    });
  }, [snake, food, obstacles]);

  return (
    <div className="fixed inset-0 bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 via-black to-black" />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <motion.button
          onClick={onBack}
          className="absolute top-8 left-8 group flex items-center text-amber-400 hover:text-amber-300 transition-colors"
          whileHover={{ x: -4 }}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour
        </motion.button>

        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <Coffee className="h-8 w-8 text-amber-400" />
            <h1 className="text-3xl font-bold text-white">Coffee Snake Challenge</h1>
            <Gamepad2 className="h-8 w-8 text-amber-400" />
          </motion.div>
          <p className="text-amber-400/80">
            Collectez {COFFEE_BEANS_TO_WIN} grains de café pour débloquer une surprise !
          </p>
        </div>

        <motion.div 
          className="relative bg-black/50 p-4 rounded-xl backdrop-blur-sm border border-white/10"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <canvas
            ref={canvasRef}
            width={GRID_SIZE * CELL_SIZE}
            height={GRID_SIZE * CELL_SIZE}
            className="border border-white/20 rounded-lg shadow-lg"
          />

          <AnimatePresence mode="wait">
            {showReward && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-md rounded-xl"
              >
                <div className="text-center p-8 relative">
                  <motion.div
                    initial={{ rotate: -20, scale: 0.8 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="absolute -top-12 -right-8"
                  >
                    <PartyPopper className="h-12 w-12 text-amber-400" />
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Gift className="h-16 w-16 text-amber-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-4">
                      Voici ta récompense !
                    </h2>
                    <motion.button
                      onClick={() => {
                        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg text-white font-medium shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Récupérer
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {!gameStarted && !gameOver && !showReward && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-xl"
              >
                <motion.button
                  onClick={() => {
                    initializeGame();
                    setGameStarted(true);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg text-white font-medium shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Commencer le jeu
                </motion.button>
              </motion.div>
            )}

            {gameOver && !showReward && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-xl"
              >
                <div className="text-center">
                  <motion.h2 
                    className="text-2xl font-bold text-white mb-4"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                  >
                    Game Over!
                  </motion.h2>
                  <motion.p 
                    className="text-amber-400 mb-4"
                    initial={{ y: -10 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    Score: {score}
                  </motion.p>
                  <motion.button
                    onClick={() => {
                      initializeGame();
                      setGameStarted(true);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg text-white font-medium shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ y: 10 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Réessayer
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="mt-4 flex items-center gap-4 text-white/60">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#22c55e] rounded-sm" /> Snake
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#d97706] rounded-sm" /> Café
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#ef4444] rounded-sm" /> Obstacles
          </div>
        </div>

        <div className="mt-4 text-white/60">
          Score: {score} / {COFFEE_BEANS_TO_WIN}
        </div>
      </div>
    </div>
  );
};