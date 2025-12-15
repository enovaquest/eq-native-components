/**
 * Usage: Import the generated components into your React Native app
 * This file demonstrates how to use exported layouts from the Component Builder
 */

import React from 'react';
import { View, Text } from 'react-native';
import { ThemeProvider } from '../../themes/themeProvider';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Card } from '../../components/Cards/Card';
import { Grid } from '../../components/Layout/Grid';

// Example 1: Simple Layout Created in Builder
export const BuiltLoginForm: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <ThemeProvider initialThemeName="nebulaCorporateTheme">
      <View style={{ flex: 1, padding: 16, backgroundColor: '#f5f5f5' }}>
        <Card headerText="Login">
          <Input
            placeholder="Enter your email"
            label="Email"
            type="email"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            placeholder="Enter your password"
            label="Password"
            type="password"
            value={password}
            onChangeText={setPassword}
          />
          <Button
            text="Sign In"
            onPress={() => console.log('Login', { email, password })}
          />
        </Card>
      </View>
    </ThemeProvider>
  );
};

// Example 2: Grid-based Layout
export const BuiltDashboard: React.FC = () => {
  return (
    <ThemeProvider initialThemeName="nebulaCorporateTheme">
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
          Dashboard
        </Text>
        <Grid columns={2} gap={16}>
          <Card headerText="Stats">
            <Text>Users: 1,234</Text>
          </Card>
          <Card headerText="Revenue">
            <Text>$45,678</Text>
          </Card>
          <Card headerText="Conversion">
            <Text>2.5%</Text>
          </Card>
          <Card headerText="Growth">
            <Text>+12%</Text>
          </Card>
        </Grid>
      </View>
    </ThemeProvider>
  );
};

// Export both examples
export default {
  BuiltLoginForm,
  BuiltDashboard,
};
