'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

type Node = { id: number; x: number; y: number; r: number; primary?: boolean };
type Edge = { from: number; to: number };

export function KnowledgeGraphBg() {
  const { nodes, edges } = useMemo(() => {
    const nodes: Node[] = [
      { id: 0, x: 50, y: 30, r: 5, primary: true },
      { id: 1, x: 150, y: 50, r: 3 },
      { id: 2, x: 250, y: 25, r: 4 },
      { id: 3, x: 350, y: 60, r: 3 },
      { id: 4, x: 450, y: 35, r: 5, primary: true },
      { id: 5, x: 550, y: 55, r: 3 },
      { id: 6, x: 100, y: 120, r: 4 },
      { id: 7, x: 200, y: 100, r: 3 },
      { id: 8, x: 300, y: 130, r: 5, primary: true },
      { id: 9, x: 400, y: 110, r: 3 },
      { id: 10, x: 500, y: 125, r: 4 },
      { id: 11, x: 600, y: 100, r: 3 },
      { id: 12, x: 75, y: 200, r: 3 },
      { id: 13, x: 175, y: 180, r: 4 },
      { id: 14, x: 275, y: 210, r: 3 },
      { id: 15, x: 375, y: 190, r: 5, primary: true },
      { id: 16, x: 475, y: 215, r: 3 },
      { id: 17, x: 575, y: 195, r: 4 },
      { id: 18, x: 125, y: 280, r: 3 },
      { id: 19, x: 225, y: 260, r: 5, primary: true },
      { id: 20, x: 325, y: 290, r: 3 },
      { id: 21, x: 425, y: 270, r: 4 },
      { id: 22, x: 525, y: 295, r: 3 },
      { id: 23, x: 625, y: 280, r: 3 },
    ];
    const edges: Edge[] = [
      [0,1],[1,2],[2,3],[3,4],[4,5],[0,6],[1,7],[2,7],[3,8],[4,9],[5,11],
      [6,7],[7,8],[8,9],[9,10],[10,11],[6,12],[7,13],[8,14],[9,15],[10,16],[11,17],
      [12,13],[13,14],[14,15],[15,16],[16,17],[12,18],[13,19],[14,19],[15,20],[16,21],[17,22],
      [18,19],[19,20],[20,21],[21,22],[21,23],
    ].map(([from, to]) => ({ from, to }));
    return { nodes, edges };
  }, []);

  return (
    <svg
      viewBox="0 0 700 320"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <g>
        {edges.map((edge, i) => {
          const from = nodes[edge.from];
          const to = nodes[edge.to];
          return (
            <motion.line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="hsl(var(--border))"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 1.5, delay: i * 0.03 }}
            />
          );
        })}
        {nodes.map((node, i) => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill={node.primary ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'}
            opacity={node.primary ? 0.8 : 0.3}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: node.primary ? 0.8 : 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
          />
        ))}
      </g>
    </svg>
  );
}
