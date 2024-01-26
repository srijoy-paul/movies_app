import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Framer() {
  const [selectedId, setSelectedId] = useState(null);
  const items = [
    { id: 1, subtitle: "Tido Priya", title: "TP" },
    { id: 2, subtitle: "Reconsilers Context", title: "RC" },
    { id: 3, subtitle: "Srijoy Priyanka", title: "SP" },
  ];
  return (
    <div>
      {items.map((item) => (
        <motion.div layoutId={item.id} onClick={() => setSelectedId(item.id)}>
          <motion.h5>{item.subtitle}</motion.h5>
          <motion.h2>{item.title}</motion.h2>
        </motion.div>
      ))}
      <AnimatePresence>
        {selectedId && (
          <motion.div layoutId={selectedId}>
            <motion.h5>{item.subtitle}</motion.h5>
            <motion.h2>{item.title}</motion.h2>
            <motion.button onClick={() => setSelectedId(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Framer;
