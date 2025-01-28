import React, { useState, useEffect } from 'react';
import { Container,Title, useMantineColorScheme, Group, ActionIcon, Box, Transition } from '@mantine/core';
import { IconSun, IconMoon, IconArrowUp, IconArrowDown } from '@tabler/icons-react';
import TableComponent from './components/Table';
import BarChart from './components/BarChart';

const App: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
      
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      setIsAtBottom(position + windowHeight >= documentHeight - 20); // 20px threshold
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollToBottom = () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });

  return (
    <Container>
       <Title order={1} align="center" mt="xl" mb="xl">
       Data Visualization App
      </Title>
      {/* Color scheme toggle button on the left */}
      <Box
        style={{
          position: 'fixed',
          top: 20,
          left: 20,
          zIndex: 1000,
        }}
      >
        <ActionIcon
          onClick={() => toggleColorScheme()}
          size="lg"
          color="blue"
          variant="filled"
          radius="xl"
        >
          {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
        </ActionIcon>
      </Box>

      {/* Scroll buttons on the right */}
      <Box
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        <Group>
          <Transition mounted={scrollPosition > 100} transition="fade">
            {(styles) => (
              <ActionIcon 
                onClick={scrollToTop} 
                size="lg" 
                color="blue" 
                variant="filled"
                radius="xl"
                style={styles}
              >
                <IconArrowUp size={18} />
              </ActionIcon>
            )}
          </Transition>
          <Transition mounted={!isAtBottom} transition="fade">
            {(styles) => (
              <ActionIcon 
                onClick={scrollToBottom} 
                size="lg" 
                color="blue" 
                variant="filled"
                radius="xl"
                style={styles}
              >
                <IconArrowDown size={18} />
              </ActionIcon>
            )}
          </Transition>
        </Group>
      </Box>

      <TableComponent />
      <BarChart />
    </Container>
  );
};

export default App;
